import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService, private _Router:Router, private _FormBuilder:FormBuilder) {}

  errMsg:string = '';
  isLoading:boolean = false;

  // registerForm:FormGroup = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
  //   rePassword: new FormControl(''),
  //   phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  // }, {validators:[this.confirmPassword]} as FormControlOptions );

  registerForm:FormGroup = this._FormBuilder.group({
    name:['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]],
    rePassword:[''],
    phone:['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, {validators:[this.confirmPassword]} as FormControlOptions)

  confirmPassword(group:FormGroup):void {
    const pass = group.get('password');
    const rePass = group.get('rePassword');

    if(rePass?.value == '') {
      rePass?.setErrors({ required: true })
    } 
    else if(pass?.value != rePass?.value) {
      rePass?.setErrors({ mismatch: true })
    }
  }

  handleForm():void {
    const userData = this.registerForm.value;
    this.isLoading = true;

    if(this.registerForm.valid === true) {
      this._AuthService.register(userData).subscribe({
        next: (res) => {
          if(res.message == "success") {
            this.isLoading = false;
            this._Router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.errMsg = err.error.message;
          this.isLoading = false;
        }
      })
    }
  }

}
