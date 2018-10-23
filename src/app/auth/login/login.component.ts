import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) { }
  public formLogin: FormGroup;
  public errors: any[] = [];
  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.formLogin = this._fb.group({
      'email': ['', [Validators.required,Validators.email]],
      'password': ['', Validators.required],
    })
  }
  isInvalidForm(field: string){
    return this.formLogin.controls[field].invalid &&
          (this.formLogin.controls[field].dirty || this.formLogin.controls[field].touched);
  }
  isRequired(field: string){
    return this.formLogin.controls[field].errors.required;
  }
  onLogin(){
    this._authService.login(this.formLogin.value).subscribe(x=>this._router.navigate(['/rentals']),
     err=>this.errors = err.error.errors)
  }
}
