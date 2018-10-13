import { Rental } from './../shared/rental.model';
import { RentalService } from './../shared/rental.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bwm-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {

  constructor(private _rentalService: RentalService) { }
  public rentals: Rental[] = [];
  ngOnInit() {
    this._rentalService.getRentals().subscribe(
      (rentals: Rental[])=>this.rentals = rentals),
      (err)=>{},
      ()=>{}
  }

}
