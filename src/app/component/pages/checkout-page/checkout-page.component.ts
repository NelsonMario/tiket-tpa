import { Component, OnInit } from '@angular/core';
import { GetHttpService } from 'src/app/service/get-http/get-http.service';
import { Observable } from 'rxjs';
import { CountryByCallingPhone } from 'src/app/models/country-by-calling-phone';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { MatDialogRef } from '@angular/material/dialog';
import { RailroadService } from 'src/app/service/railroad/railroad.service';
import { CarService } from 'src/app/service/car/car.service';
import { CheckoutCarService } from 'src/app/service/checkout-car/checkout-car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  passengerTitle = new FormControl()
  fullName = new FormControl()
  identity = new FormControl()

  emailOrPhone = new FormControl('')
  password = new FormControl('');

  title = new FormControl()
  name = new FormControl()
  email = new FormControl()
  phoneNumber = new FormControl()

  countryCode : string = ""
  isLogin : boolean = false;
  countryCode$: Observable<CountryByCallingPhone[]>;
  car : any

  minute = 0
  second = 5
  interval : NodeJS.Timer

  constructor(private getHttpService : GetHttpService, private graphql: graphqlService, private checkout: CheckoutCarService, private router: Router) {
    this.car = checkout.getCar();
    console.log(checkout.getCar())
  }

  ngOnInit(): void {
    this.countryCode$ = this.getHttpService.getCountryCode("https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-calling-code.json");
    this.checkUser()

    this.interval = setInterval(() => {
      if(this.minute == 0 && this.second == 0){
        clearInterval(this.interval)
        this.router.navigate([''])
      }
      if(this.second == 0){
        this.minute--
        this.second = 60
      }
      this.second--
    }, 1000)
  }


  selected(event){
    this.countryCode = event.value;
  }

  checkUser(){
    if(localStorage.getItem("currentUser"))
      this.isLogin = !this.isLogin
  }

  login(){
    var userTemp: User[];
    this.graphql.getUserByEmailOrPhone(this.emailOrPhone.value).subscribe(async query=>{
      userTemp = query.data.userByEmailOrPhone;
      await
      localStorage.setItem('currentUser', JSON.stringify(userTemp))
      if(userTemp.length === 0)
        console.log("Null User")
      else{
        console.log(userTemp[0].firstName);
        console.log(JSON.parse(localStorage.getItem('currentUser')))
        if(userTemp[0].password == this.password.value)
          window.location.reload()
        else
          console.log("Password False")
      }
    })

}
}
