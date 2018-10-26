import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Booking } from './booking.model';
import { Injectable } from '@angular/core';

@Injectable()
export class BookingService {

  constructor(private _http: HttpClient) { }
  public createBooking(booking: Booking): Observable<any>{
    return this._http.post('http://localhost:3000/api/v1/bookings', booking);
  }
}
