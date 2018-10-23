import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
class DecodedToken{
  exp: number = 0;
  username: string = '';
}
@Injectable()
export class AuthService {
  private _decodedToken;
  constructor(private _httpClient: HttpClient) {
    this._decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();
  }
  public registerUser(userData): Observable<any>{
    return this._httpClient.post(`http://localhost:3000/api/v1/users/register`, userData);
  }
  public login(userData): Observable<any>{
    return this._httpClient.post(`http://localhost:3000/api/v1/users/auth`,
    {
      email: userData.email,
      password: userData.password
    }).pipe(map(token=>this.saveToken(token)));
  }
  private getExpiration(){
    return moment.unix(this._decodedToken.exp);
  }
  public isAuthenticated(): boolean{
    return moment().isBefore(this.getExpiration());
  }
  private saveToken(token): string{
    this._decodedToken = jwt.decode(token);
    localStorage.setItem('bwm_auth', token);
    localStorage.setItem('bwm_meta', JSON.stringify(this._decodedToken));
    return token;
  }
  public logout(){
    localStorage.removeItem('bwm_auth');
    localStorage.removeItem('bwm_meta');
    this._decodedToken = new DecodedToken();
  }
  public getUsername(): string{
    return this._decodedToken.username;
  }
  public getToken(): string{
    return localStorage.getItem('bwm_auth');
  }
}
