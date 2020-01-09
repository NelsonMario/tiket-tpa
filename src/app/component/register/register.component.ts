import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { CountryByCallingPhone } from 'src/app/models/country-by-calling-phone';
import { GetHttpService } from 'src/app/service/get-http/get-http.service';
import { User } from 'src/app/models/user';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { async } from '@angular/core/testing';
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
  password: string = "";

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

  register(){
    this.user.email = this.data.email.replace(/\s/g, "");
    this.user.firstName = this.firstName.replace(/\s/g, "");
    this.user.lastName = this.lastName.replace(/\s/g, "");
    this.user.phoneNumber = "+" + this.countryCode + this.phoneNumber.replace(/\s/g, "");
    this.user.password = this.password.replace(/\s/g, "");


    this.graphql.insertRegisterUser(this.user.email, this.user.firstName,
      this.user.lastName, this.user.password, this.user.phoneNumber).subscribe(async query=>{
      });
  }


}
