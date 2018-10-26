import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./common/header/header.component";
import { TempComponent } from "./temp/temp.component";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { RentalModule } from "./rental/rental.module";
import { AuthModule } from "./auth/auth.module";

const Routes: Routes = [
  { path: "", redirectTo: "rentals", pathMatch: "full" },
  { path: "temp", component: TempComponent }
];
@NgModule({
  declarations: [AppComponent, HeaderComponent, TempComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    RentalModule,
    AuthModule,
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
