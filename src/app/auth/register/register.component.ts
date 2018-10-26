import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _authService: AuthService) { }
  public formData: any;
  ngOnInit() {
    this.formData = {}
  }
  register(formValue){
    console.log(formValue.value)
    this._authService.registerUser(formValue.value).subscribe(()=>console.log('success'), err=>console.log(err))
  }
}
