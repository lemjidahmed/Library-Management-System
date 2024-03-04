import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ForgetPasswordService} from "../services/forget-password.service";
import {passwordMatchValidator} from "../shared/password-match.directive";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  currentUser:any;
  emailSent=false;
  constructor(private fb:FormBuilder,private forgetPasswordService :ForgetPasswordService,private router:Router) { }
  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  })

  updatePasswordForm = this.fb.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  })
  ngOnInit(): void {
  }
  get email() {
    return this.emailForm.controls['email'];
  }
  get password() {
    return this.updatePasswordForm.controls['password'];
  }
  get confirmPassword() {
    return this.updatePasswordForm.controls['confirmPassword'];
  }

  verifyForgetPassword() {
    const { email} = this.emailForm.value;
    this.forgetPasswordService.verifyEmail(email).subscribe({
      next: data => {
        this.currentUser=data
        this.emailSent=true
        console.log("current user is "+this.currentUser)
      },
      error: err => {
            console.log("there is a proble min the forget password")
      }
    });
  }


  updatePassword() {
    const { password} = this.updatePasswordForm.value;
    this.forgetPasswordService.resetPassword(this.currentUser,password).subscribe({
      next: data => {
        console.log("password changed successfully")
        this.router.navigate(['/login'])
      },
      error: err => {
        console.log("there is a problem in update password")
      }
    });
  }
}
