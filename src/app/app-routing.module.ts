import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './model-component/customer/customer.component';
import { AdminComponent } from './model-component/admin/admin.component';
import { CustomerSectionComponent } from './model-component/customer/customer-section/customer-section.component'
import { FlightPageComponent } from './component/pages/flight-page/flight-page.component';
import { TrainPageComponent } from './component/pages/train-page/train-page.component';
import { ProfilePageComponent } from './component/pages/profile-page/profile-page/profile-page.component';


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
  {path: 'profile',
    component: CustomerComponent,
    children: [
      {path: '',
      component: ProfilePageComponent,
      outlet: "customer-page"},
    ]
  },
  {
    path: 'admin',
    component: AdminComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
