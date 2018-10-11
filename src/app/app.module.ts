import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./common/header/header.component";

const Routes: Routes = [{ path: "", component: AppComponent }];
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, RouterModule.forRoot(Routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
