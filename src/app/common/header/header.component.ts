import { Router } from '@angular/router';
import { AuthService } from './../../auth/shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private _router: Router) { }

  ngOnInit() {

  }
  logout(){
    this.authService.logout();
  }
}
