import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CountryByCallingPhone } from 'src/app/models/country-by-calling-phone';
import { GetHttpService } from 'src/app/service/get-http/get-http.service';
import { User } from 'src/app/models/user';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { async } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  countryCode$: Observable<CountryByCallingPhone[]>;
  user: User = new User();
  countryCode:string = "";
  email:string = "";
  firstName: string = "";
  lastName: string = "";
  phoneNumber: string = "";
  // password: string = "";
  password = new FormControl()
  shown = ""
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private getHttpService: GetHttpService,
              private graphql: graphqlService) {
  }

  ngOnInit() {
    this.countryCode$ = this.getHttpService.getCountryCode("https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-calling-code.json");
  }

  selected(event){
    this.countryCode = event.value;
  }

  getFirstName($event){
    this.firstName = $event;
  }

  getLastName($event){
    this.lastName = $event;
  }

  getPhoneNumber($event){
    this.phoneNumber = $event;
  }

  getPassword($event){
    this.password = $event;
  }

  checkLength(string, min, max){
    if(string.length <= max && string.length >= min)
      return true
    return false

  }

  emailValidation(email){
    if(email[email.indexOf('@') - 1] ||email[email.indexOf('@') + 1])
      return false
    else if(!email.endsWith(".com"))
      return false
    return true
  }

  register(){

    this.user.email = this.data.email.replace(/\s/g, "");
    this.user.firstName = this.firstName.replace(/\s/g, "");
    this.user.lastName = this.lastName.replace(/\s/g, "");
    this.user.phoneNumber = "+" + this.countryCode + this.phoneNumber.replace(/\s/g, "");
    this.user.password = this.password.value

    if(!this.checkLength(this.user.phoneNumber, 14, 14))console.log("phone")
    if(!this.checkLength(this.user.firstName, 5, 10))console.log("first")
    if(!this.checkLength(this.user.lastName, 5, 10))console.log("last")
    if(!this.checkLength(this.user.password, 5, 10))console.log("password")
    if(this.emailValidation(this.user.email))console.log("email")

    if(this.emailValidation(this.user.email) || !this.checkLength(this.user.phoneNumber, 14, 14) || !this.checkLength(this.user.firstName, 5, 10) || !this.checkLength(this.user.lastName, 5, 10) || !this.checkLength(this.user.password, 5, 10)) console.log("Registration Failed")
    else{
      this.graphql.insertRegisterUser(this.user.email, this.user.firstName,
        this.user.lastName, this.user.password, this.user.phoneNumber).subscribe(async query=>{
          console.log("Registration Success")
        });
        localStorage.setItem('currentUser', JSON.stringify(this.user))
        window.location.reload()
    }
  }

  setShown(){
    this.shown = this.shown ==  "password" ? "text" : "password"
  }

}
