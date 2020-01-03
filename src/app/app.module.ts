import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { CustomerHeaderComponent } from './component/customer/customer-header/customer-header.component';
import { CustomerFooterComponent } from './component/customer/customer-footer/customer-footer.component';
import { AdminComponent } from './component/admin/admin.component';
import { CustomerComponent } from './component/customer/customer.component';
import { CustomerSectionComponent } from './component/customer/customer-section/customer-section.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { ReservationComponent } from './component/reservation/reservation.component';
import { ReservationNavBarComponent } from './component/reservation/reservation-nav-bar/reservation-nav-bar.component';
import { RentCarReservationComponent } from './component/reservation/reservation-type/rent-car-reservation/rent-car-reservation.component';
import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GoogleLoginService } from './service/google/google-login.service';
import { SheetResourceService } from './service/google/sheet-resource.service';
import { ButtonComponent } from './component/button/button.component';
import { InputPlaceholderComponent } from './component/input-placeholder/input-placeholder.component';
import { RegisterComponent } from './component/register/register.component';
import { GraphQLModule } from './graphql.module';

let gapiClientConfig: NgGapiClientConfig = {
  client_id: "602076487631-28k1qh3apnsm4510llsq5reejkq4qtlt.apps.googleusercontent.com",
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  ux_mode: "redirect",
  redirect_uri: "http://localhost:4200/",
  scope: [
      "https://www.googleapis.com/auth/userinfo.profile"
  ].join(" ")
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerHeaderComponent,
    CustomerFooterComponent,
    AdminComponent,
    CustomerComponent,
    CustomerSectionComponent,
    CarouselComponent,
    ReservationComponent,
    ReservationNavBarComponent,
    RentCarReservationComponent,
    ButtonComponent,
    InputPlaceholderComponent,
    RegisterComponent,
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,

    RouterModule.forRoot([{
      path: 'redirect',
      component: AppComponent
    }]),
    HttpClientModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    GraphQLModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
