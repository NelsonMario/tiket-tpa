import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../../component/login/login.component';
import { RegisterComponent } from '../../../component/register/register.component';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss']
})
export class CustomerHeaderComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit() {
  }

  openRegisterDialog(){
    this.dialog.open(RegisterComponent, {
      data:{
        email: " "
      }
    });
  }

  openLoginDialog() : void {
    let reference = this.dialog.open(LoginComponent);
    reference.afterClosed().subscribe(result=>{
      if(result){
        let reference = this.dialog.open(RegisterComponent, {
          data:{
            email: result
          }
        })
      }
    })
  }
}
