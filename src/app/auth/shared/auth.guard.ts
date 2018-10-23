import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  private _url: string;
  constructor(private _authService: AuthService, private _router: Router){}
  private handleAuthState(): boolean {
    if(this.loginOrRegister()){
      this._router.navigate(['/rentals']);
      return false;
    }
    return true;
  }
  private handleNotAuthState(): boolean {
    if(this.loginOrRegister()){
      return true;
    }
    this._router.navigate(['/login']);
    return false;
  }
  private loginOrRegister(): boolean{
    if(this._url.includes('login')||this._url.includes('register')) return true;
    return false;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this._url = state.url;
      if(this._authService.isAuthenticated()) return this.handleAuthState();
    return this.handleNotAuthState();
  }
}
