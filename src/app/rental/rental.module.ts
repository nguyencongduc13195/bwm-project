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
const rentalRoutes: Routes = [
  {
    path: "rentals",
    component: RentalComponent,
    children: [
      { path: "", component: RentalListComponent },
      { path: ":rentalID", component: RentalDetailComponent }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rentalRoutes),
    HttpClientModule,
    NgPipesModule
  ],
  declarations: [
    RentalListItemComponent,
    RentalListComponent,
    RentalComponent,
    RentalDetailComponent
  ],
  providers: [RentalService]
})
export class RentalModule {}
