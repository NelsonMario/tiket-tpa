import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgForm} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatLabel } from '@angular/material/form-field';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule} from '@angular/material/select'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatInputModule } from '@angular/material/input'
import {MatExpansionModule} from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { CustomerHeaderComponent } from './model-component/customer/customer-header/customer-header.component';
import { CustomerFooterComponent } from './model-component/customer/customer-footer/customer-footer.component';
import { AdminComponent } from './model-component/admin/admin.component';
import { CustomerComponent } from './model-component/customer/customer.component';
import { CustomerSectionComponent } from './model-component/customer/customer-section/customer-section.component';
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
import { ButtonComponent } from './custom-component/button/button.component';
import { InputPlaceholderComponent } from './custom-component/input-placeholder/input-placeholder.component';
import { RegisterComponent } from './component/register/register.component';
import { GraphQLModule } from './graphql.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { FlightReservationComponent } from './component/reservation/reservation-type/flight-reservation/flight-reservation.component';
import { HotelReservationComponent } from './component/reservation/reservation-type/hotel-reservation/hotel-reservation.component';
import { EntertainmentReservationComponent } from './component/reservation/reservation-type/entertainment-reservation/entertainment-reservation.component';
import { TrainReservationComponent } from './component/reservation/reservation-type/train-reservation/train-reservation.component';
import { FlightPageComponent } from './component/pages/flight-page/flight-page.component';
import { TrainPageComponent } from './component/pages/train-page/train-page.component';
import { ProfilePageComponent } from './component/pages/profile-page/profile-page/profile-page.component';
import { Plugins } from 'protractor/built/plugins';
import { CarPagesComponent } from './component/pages/car-pages/car-pages.component';
import { CheckoutPageComponent } from './component/pages/checkout-page/checkout-page.component';
import { AdminHeaderComponent } from './model-component/admin/admin-header/admin-header.component';
import { AdminSectionComponent } from './model-component/admin/admin-section/admin-section.component';
import { AdminFlightComponent } from './component/admin-pages/flight/admin-flight/admin-flight.component';
import { HotelPagesComponent } from './component/pages/hotel-pages/hotel-pages.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    FlightReservationComponent,
    HotelReservationComponent,
    EntertainmentReservationComponent,
    TrainReservationComponent,
    ButtonComponent,
    InputPlaceholderComponent,
    RegisterComponent,
    FlightPageComponent,
    TrainPageComponent,
    ProfilePageComponent,
    CarPagesComponent,
    CheckoutPageComponent,
    AdminComponent,
    AdminHeaderComponent,
    AdminSectionComponent,
    AdminFlightComponent,
    HotelPagesComponent
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,

    //material
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatButtonModule,
    MatTabsModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatSnackBarModule,

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
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
