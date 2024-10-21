import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ForgotpassService } from 'src/app/core/services/forgotpass.service';
import { ShareReplayConfig } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  constructor(private _ForgotpassService:ForgotpassService, private _Router:Router) {}

  step1:boolean = true;
  step2:boolean = false;
  step3:boolean = false;
  email:string = '';
  userMsg:string = '';

  forgotForm:FormGroup = new FormGroup({
    email:new FormControl('')
  });

  resetCodeForm:FormGroup = new FormGroup({
    resetCode:new FormControl('')
  });

  resetPasswordForm:FormGroup = new FormGroup({
    newPassword:new FormControl('')
  });

  forgotPassword():void {
    let userEmail = this.forgotForm.value;
    this.email = userEmail.email;

    this._ForgotpassService.forgotPassword(userEmail).subscribe({
      next: (res) => {
        this.userMsg = res.message;
        this.step1 = false;
        this.step2 = true;
      },
      error: (err) => {
        this.userMsg = err.error.message;
      }
    })
  }

  resetCode():void {
    let resetCode = this.resetCodeForm.value;

    this._ForgotpassService.resetCode(resetCode).subscribe({
      next: (res) => {
        this.userMsg = res.status;
        this.step2 = false;
        this.step3 = true;
      },
      error: (err) => {
        this.userMsg = err.error.message;
      }
    })
  }

  resetPass():void {
    let resetPassword = this.resetPasswordForm.value;
    resetPassword.email = this.email;

    this._ForgotpassService.resetPassword(resetPassword).subscribe({
      next: (res) => {
        if(res.token) {
          localStorage.setItem('eToken', res.token);
          this._Router.navigate(['/home']);
        }
        this.userMsg = res.status;
        this.step2 = false;
        this.step3 = true;
      },
      error: (err) => {
        this.userMsg = err.error.message;
      }
    })
  }

}
