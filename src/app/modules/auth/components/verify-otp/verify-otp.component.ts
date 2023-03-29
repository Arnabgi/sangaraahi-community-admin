import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validation } from 'src/app/shared/validator/validation';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit{
  otpForm!: FormGroup;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){

  }
  ngOnInit(): void {
    this.init();
  }

  init(){
    this.otpForm = new FormGroup({
      otp: new FormControl(null, [Validators.required,Validators.min(100000),Validators.max(999999)])
    })
  }

  numericOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }
    return true;
  }

  submit(){

  }

}
