import { Rental } from './rental.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RentalService {

  constructor(private _http: HttpClient) { }

  public getRentalDetail(rentalID: string): Observable<any>{
    return this._http.get(`http://localhost:3000/api/v1/rentals/${rentalID}`);
  }
  public getRentals() : Observable<any>{
    return this._http.get(`http://localhost:3000/api/v1/rentals`);
  }
}
