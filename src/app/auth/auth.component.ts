import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  hide = true;
  showButton=false
  loginForm: FormGroup = new FormGroup({
    Email : new FormControl('',[Validators.required,Validators.email]),
    Password : new FormControl('',[Validators.required,Validators.minLength(6)])
   })
  submitted = false;
  constructor(private loginService: LoginService,private router:Router,private snackbar:MatSnackBar ) { }
  
  ngOnInit(): void {
  }
  
  SignIn(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      alert("Incorrect information, Please check your email and password.");
      return;
    }
    this.loginService.SignIn(this.loginForm.value).subscribe((response: any) => {
      localStorage.setItem('token', response.token);
      this.snackbar.open('Successfully logged in', 'Close', {
        duration: 3000
      });
      this.router.navigate(['/matching-header'])
    },
      (error) => {
        console.log(error);
        alert("Incorrect information, Please check your email and password.");
      })
  } 
  matcher = new MyErrorStateMatcher();
}
