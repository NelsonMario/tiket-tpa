import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './model-component/customer/customer.component';
import { AdminComponent } from './model-component/admin/admin.component';
import { CustomerSectionComponent } from './model-component/customer/customer-section/customer-section.component'
import { FlightPageComponent } from './component/pages/flight-page/flight-page.component';
import { TrainPageComponent } from './component/pages/train-page/train-page.component';
import { ProfilePageComponent } from './component/pages/profile-page/profile-page/profile-page.component';
import { CarPagesComponent } from './component/pages/car-pages/car-pages.component';
import { CheckoutPageComponent } from './component/pages/checkout-page/checkout-page.component';
import { componentFactoryName } from '@angular/compiler';
import { AdminFlightComponent } from './component/admin-pages/flight/admin-flight/admin-flight.component';
import { AdminSectionComponent } from './model-component/admin/admin-section/admin-section.component';
import { HotelPagesComponent } from './component/pages/hotel-pages/hotel-pages.component';
import { ChatPageComponent } from './component/pages/chat-page/chat-page.component';
import { AdminHotelComponent } from './component/admin-pages/admin-hotel/admin-hotel.component';
import { HotelDetailComponent } from './component/pages/hotel-detail/hotel-detail.component';
import { AdminTrainComponent } from './component/admin-pages/admin-train/admin-train.component';


const routes: Routes = [
  {path: '',
    component: CustomerComponent,
    children: [
      {path: '',
      component: CustomerSectionComponent,
      outlet: "customer-page"},
    ]
  },
  {path: 'flight',
    component: CustomerComponent,
    children: [
      {path: '',
      component: FlightPageComponent,
      outlet: "customer-page"},
    ]
  },
  {path: 'train',
    component: CustomerComponent,
    children: [
      {path: '',
      component: TrainPageComponent,
      outlet: "customer-page"},
    ]
  },
  {path: 'car',
    component: CustomerComponent,
    children: [
      {path: '',
      component: CarPagesComponent,
      outlet: "customer-page"},
    ]
  },
  {path: 'search-hotel',
    component: CustomerComponent,
    children: [
      {path: '',
      component: HotelPagesComponent,
      outlet: "customer-page"},
    ]
  },
  {path: 'detail-hotel',
    component: CustomerComponent,
    children: [
      {path: '',
      component: HotelDetailComponent,
      outlet: "customer-page"},
    ]
  },
  {path: 'profile',
    component: CustomerComponent,
    children: [
      {path: '',
      component: ProfilePageComponent,
      outlet: "customer-page"},
    ]
  },
  {path: 'checkout',
    component: CustomerComponent,
    children: [
      {path: '',
      component: CheckoutPageComponent,
      outlet: "customer-page"},
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminSectionComponent,
        outlet: "admin-page"
      },
    ]
  },
  {
    path: 'admin-flight',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminFlightComponent,
        outlet: "admin-page"
      },
    ]
  },
  {
    path: 'admin-hotel',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminHotelComponent,
        outlet: "admin-page"
      },
    ]
  },
  {
    path: 'admin-train',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminTrainComponent,
        outlet: "admin-page"
      },
    ]
  },
  {
    path: 'chats',
    component: CustomerComponent,
    children: [
      {
        path: '',
        component: ChatPageComponent,
        outlet: "customer-page"
      },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
