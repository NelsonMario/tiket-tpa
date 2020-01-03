import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register.component';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss']
})
export class CustomerHeaderComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit() {
  }

  openLoginDialog() : void {
    this.dialog.open(LoginComponent);
  }

  openRegisterDialog() : void {
    this.dialog.open(RegisterComponent);
  }
}
