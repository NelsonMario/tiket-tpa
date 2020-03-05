import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../component/login/login.component';
import { RegisterComponent } from '../../../component/register/register.component';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { FlightService } from 'src/app/service/flight/flight.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss']
})
export class CustomerHeaderComponent implements OnInit {

  user: User = JSON.parse(localStorage.getItem('currentUser'))
  constructor(public dialog:MatDialog, public graphqlService: graphqlService, public flightService: FlightService, public router: Router) { }
  header: any[] = []
  ngOnInit() {
    if(!this.user){
      this.header.push("Pesawat")
      this.header.push("Hotel")
      this.header.push("Kereta Api")
      this.header.push("Sewa Mobil")
      this.header.push("Hiburan")
    }else{
      if(this.user[0].language == 'ID'){
        this.header.push("Pesawat")
        this.header.push("Hotel")
        this.header.push("Kereta Api")
        this.header.push("Sewa Mobil")
        this.header.push("Hiburan")
      }else{
        this.header.push("Flight")
        this.header.push("Hotel")
        this.header.push("Train")
        this.header.push("Rent Car")
        this.header.push("Event")
      }
    }
    console.log(JSON.parse(localStorage.getItem('currentUser')))
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

  profile(){
    this.router.navigate(["/profile"])
  }


  // nav-link
  // NOTES : DELETE LATER
  flight$: Subscription

  searchFlight(){
    // this.flight$ = this.graphqlService.getAllFlight().subscribe(async query=>{
    //   this.flightService.departureFlights = query.data.flights
    //   console.log(this.flightService.departureFlights)
    //   await
    //   this.router.navigate(["/flight"])
    // })
  }

  ngOnDestroy(): void {
  //   if(this.flightService.departureFlights.length != 0 && this.flightService.departureFlights.length == 3)
  //     this.flight$.unsubscribe();
  }

  redirectBlog(){
    this.router.navigate(['blog'])
  }

  redirectSupport(){
    this.router.navigate(['chats'])
  }
}
