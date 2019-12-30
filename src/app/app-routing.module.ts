import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './component/customer/customer.component';
import { AdminComponent } from './component/admin/admin.component';
import { CustomerSectionComponent } from './component/customer/customer-section/customer-section.component'


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
