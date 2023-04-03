import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validation } from 'src/app/shared/validator/validation';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ApolloClientService } from 'src/app/shared/services/apollo-client.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GeneralResponse } from 'src/app/shared/interfaces/general-response.ineterface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit{
  otpForm!: FormGroup;
  siteKey:string =environment.siteKey;
  constructor(
    private loaderService: LoaderService,
    private apolloClient: ApolloClientService,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){

  }
  ngOnInit(): void {
    this.init();
  }

  init(){
    this.otpForm = new FormGroup({
      otp: new FormControl(null, [Validators.required,Validators.min(100000),Validators.max(999999)]),
      recaptcha: new FormControl(null,[Validators.required])
    });
  }

  numericOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }
    return true;
  }

  submit(){
    let otp = this.otpForm.controls['otp'].value;
    const data = {
      "data": {
        otp : otp
      }
    }
    this.loaderService.show();
    this.apolloClient.setModule("verifyOtp").mutateData(data).subscribe((response:GeneralResponse) => {
      this.loaderService.hide();
      console.log("error......",response.error);
      if(response.error) {
        if(response.code === 400) {
          // Sow toaster
          this.alertService.error(response.message);
        }else{
          this.alertService.error("Timed out.");
          //this.router.navigateByUrl('auth/forget-password');
        }
      } else {
        // Redirect to the password change page.
        this.router.navigateByUrl('/dashboard');
      }
  });
}

otpResend() {
  this.authService.resendOtpRefreshToken();
  // this.loaderService.show();
  // this.apolloClient.setModule("resendOtp").mutateData('').subscribe((response:GeneralResponse) => {
  //   this.loaderService.hide();
  //   if(response.error) {
  //     console.log("response......",response);
  //     if(response.code === 401) {
  //       this.alertService.error("Timed out.");
  //       // this.router.navigateByUrl('auth/forget-password');
  //     }else{
  //       this.alertService.error(response.message);
  //     }
  //   } else {
  //     this.alertService.success(response.message);
  //   }
  // });
}

}
