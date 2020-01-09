import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './model-component/customer/customer.component';
import { AdminComponent } from './model-component/admin/admin.component';
import { CustomerSectionComponent } from './model-component/customer/customer-section/customer-section.component'


const routes: Routes = [
  {path: '',
  component: CustomerComponent,
  children: [
    {path: '', component: CustomerSectionComponent}
  ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
