import { BookingService } from './../booking/shared/booking.service';
import { FormsModule } from '@angular/forms';
import { HelperService } from './../common/services/helper.service';
import { AuthGuard } from './../auth/shared/auth.guard';
import { RentalComponent } from "./rental.component";
import { RentalListItemComponent } from "./rental-list-item/rental-list-item.component";
import { RentalListComponent } from "./rental-list/rental-list.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RentalService } from "./shared/rental.service";
import { RouterModule, Routes } from "@angular/router";
import { RentalDetailComponent } from "./rental-detail/rental-detail.component";
import { HttpClientModule } from "@angular/common/http";
import { NgPipesModule } from "ngx-pipes";
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { Daterangepicker } from 'ng2-daterangepicker';
const rentalRoutes: Routes = [
  {
    path: "rentals",
    component: RentalComponent,
    children: [
      { path: "", component: RentalListComponent },
      { path: ":rentalID", component: RentalDetailComponent, canActivate: [AuthGuard]}
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rentalRoutes),
    HttpClientModule,
    NgPipesModule,
    Daterangepicker,
    FormsModule
  ],
  declarations: [
    RentalListItemComponent,
    RentalListComponent,
    RentalComponent,
    RentalDetailComponent,
    RentalDetailBookingComponent
  ],
  providers: [RentalService, AuthGuard, HelperService, BookingService]
})
export class RentalModule {}
