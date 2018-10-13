import { Rental } from './rental.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RentalService {

  constructor() { }
  private rentals: Rental[] = [
    {
      id: '1',
      title: 'Central Apartment 3',
      city: 'Bratislava',
      street: 'Hlavna',
      category: 'condo',
      image: 'https://via.placeholder.com/320x250',
      description: 'Very nice',
      bedrooms:2,
      dailyRate:334,
      shared: true,
      createdAt: '24/12/2017'
    }
  ];
  public getRentalDetail(rentalID: string): Observable<Rental>{
    return new Observable<Rental>((obs)=>{
      setTimeout(() => {
        const foundRental = this.rentals.find(val=>val.id === rentalID);
        obs.next(foundRental)
      }, 1000);
    });
  }
  public getRentals() : Observable<Rental[]>{
    const rentalObservable: Observable<Rental[]> = new Observable((obs)=>{
      setTimeout(() => {
        obs.next(this.rentals);
      }, 1000);
      setTimeout(() => {
        obs.error('ERROR');
      }, 1000);
      setTimeout(() => {
        obs.complete();
      }, 1000);
    });
    return rentalObservable;
  }
}
