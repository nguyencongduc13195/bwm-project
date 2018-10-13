import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./common/header/header.component";
import { TempComponent } from './temp/temp.component';

import { RentalModule } from './rental/rental.module';

const Routes: Routes = [
  { path: "", redirectTo: 'rentals', pathMatch: 'full' },
  { path: "temp", component: TempComponent }
];
@NgModule({
  declarations: [AppComponent, HeaderComponent, TempComponent],
  imports: [BrowserModule, RouterModule.forRoot(Routes), RentalModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
