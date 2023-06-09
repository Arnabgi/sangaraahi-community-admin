import { Injectable } from '@angular/core';
import { User } from '../typedefs/custom.types';
import { StorageService } from './storage.service';
import { LoaderService } from './loader.service';
import { ApolloClientService } from './apollo-client.service';
import { AlertService } from './alert.service';
import {Router} from "@angular/router";
import { GeneralResponse } from '../interfaces/general-response.ineterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  otpRefreshToken!:string;
  constructor(
    private storage: StorageService,
    private loader: LoaderService,
    private apollo: ApolloClientService,
    private alertService: AlertService,
    private router: Router
  ) { }

  isLogin() {
    //return this.storage.hasLocalItem('authToken') && this.storage.hasLocalItem('userData');
    return this.storage.hasLocalItem('authToken');
  }

  login(phone:any, countryCode:any, phoneCode: any) {
    const data = {
      data:{
        phone: phone,
        countryCode: countryCode,
        phoneCode: phoneCode
      }
    };
    this.loader.show();
    this.apollo.setModule("registerByPhone").mutateData(data)
      .subscribe((response:GeneralResponse) => {
        this.loader.hide();
        if(response.error) {
          //console.log("error.....",response.error);
          // Sow toaster
          this.alertService.error(response.message);
        } else {
          this.alertService.success("Otp send to the registered mobile number");
          //const user: User = response.data.user;
          const token = response.data.token.accessToken;
          const refreshToken = response.data.token.refreshToken;
          this.setToken(token);
          this.setRefreshToken(refreshToken);
          this.otpRefreshToken = refreshToken;
          //this.setUserDetails(user);
          // Redirect to the dashboard for now. Will use the last visited url
          this.router.navigateByUrl('/verify-otp');
        }

      })
  }

  logout() {
    console.log("Logging out");
    this.loader.show();
    this.apollo.setModule("logout").mutateData('').subscribe((response:GeneralResponse) => {
      console.log("Logout response");
      if(response.error) {
        // Sow toaster
        this.alertService.error(response.message);
      } else {
        this.alertService.success(response.message);
        // Redirect to the auth.
        this.storage.removeLocalItem('authToken');
        this.storage.removeLocalItem('userData');
        this.storage.removeLocalItem('refreshToken');
        this.router.navigateByUrl('/login');
      }
      this.loader.hide();
    });
  }

  getToken() {
    this.storage.getLocalStorageItem("authToken", "");
  }

  private setToken(token:string) {
    this.storage.setLocalStorageItem("authToken", token);
  }

  private setUserDetails(user:User){
    this.storage.setLocalStorageItem("userData", JSON.stringify(user));
  }

  private setRefreshToken(token:string) {
    this.storage.setLocalStorageItem('refreshToken', token);
  }

  public setOtpToken(token:string) {
    this.storage.setLocalStorageItem("sr_OtpToken", token);
  }

  getOtpToken() {
    this.storage.getLocalStorageItem("sr_OtpToken", "");
  }

  resendOtpRefreshToken(){
    const data = {
      data:{
        token: this.otpRefreshToken
      }
    };
    this.loader.show();
    this.apollo.setModule("resendOtp").mutateData(data).subscribe((response:GeneralResponse) => {
    this.loader.hide();
    if(response.error) {
      if(response.code === 401) {
        this.alertService.error("Timed out.");
        // this.router.navigateByUrl('auth/forget-password');
      }else{
        this.alertService.error(response.message);
      }
    } else {
      this.alertService.success(response.message);
    }
  });
  }
}
