import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormControl } from '@angular/forms';
import { CountryByCallingPhone } from 'src/app/models/country-by-calling-phone';
import { Observable, Subscription } from 'rxjs';
import { GetHttpService } from 'src/app/service/get-http/get-http.service';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { element } from 'protractor';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  firstName = new FormControl()
  lastName = new FormControl()
  email = new FormControl()
  phoneNumber = new FormControl()
  city = new FormControl()
  address = new FormControl()
  postcode = new FormControl()
  validNumber: any
  language: any [] = [
    "ID", "EN", "CN"
  ]
  index = 0
  countryCode : string = ""
  isLogin : boolean = false;
  countryCode$: Observable<CountryByCallingPhone[]>;
  user: User = JSON.parse(localStorage.getItem('currentUser'))

  profiles : any = [
    {"logo": "A", "desc": "Account"},
    {"logo": "M", "desc": "My Order"},
    {"logo": "T", "desc": "Tix Point"},
    {"logo": "SP", "desc": "Smart Profile"},
    {"logo": "SPA", "desc": "Smart Pay"},
    {"logo": "DR", "desc": "Daftar Refund"},
    {"logo": "LP", "desc": "Loyalty Program"},
    {"logo": "P", "desc": "Pengaturan"},
    {"logo": "PB", "desc": "Pusat Bantuan"},
    {"logo": "K", "desc": "Keluar"},
  ]

  languageSelected : string

  constructor(private getHttpService : GetHttpService, private graphql: graphqlService) {
    this.languageSelected = this.user[0].language
  }

  ngOnInit() {
    this.countryCode$ = this.getHttpService.getCountryCode("https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-calling-code.json");
    this.checkUser()
  }

  selected(event){
    this.countryCode = event.value;
  }

  checkUser(){
    if(this.user[0] != null){
      this.isLogin = !this.isLogin
      this.firstName.setValue(this.user[0].firstName)
      this.lastName.setValue(this.user[0].lastName)
      this.email.setValue(this.user[0].email)
      this.phoneNumber.setValue(this.user[0].phoneNumber)
      this.city.setValue(this.user[0].cityName)
      this.address.setValue(this.user[0].address)
      this.postcode.setValue(this.user[0].postCode)
    }
  }

  updateProfile(){
    var user : User = new User()
    console.log(this.phoneNumber.value)
    this.getHttpService.getValidNumber("http://apilayer.net/api/validate?access_key=456fb23c31b6966dfda380f8f928e5fd&number="+this.phoneNumber.value+"&country_code=&format=1").map((data) => JSON.stringify(data)).subscribe((data) => {
      this.validNumber = JSON.parse(data).valid
      return this.validNumber
    })

    if(!this.checkLength(this.firstName.value, 5, 10))alert("First Name must be 5 - 10 Chara")
    if(!this.checkLength(this.lastName.value, 5, 10))alert("Last Name must be 5 - 10 Chara")
    if(!this.validNumber)alert("Phone Format Wrong")
    if(this.emailValidation(this.email.value))alert("Email Format Wrong")

    if(this.emailValidation(this.email.value) || !this.validNumber || !this.checkLength(this.firstName.value, 5, 10) || !this.checkLength(this.lastName.value, 5, 10)) alert("Registration Failed")
    else{
        this.graphql.updateUser(this.user[0].id, this.firstName.value, this.lastName.value, this.phoneNumber.value,this.email.value, this.city.value, this.address.value, this.postcode.value, this.languageSelected).subscribe(async query => {
          await
          alert("Update Success")
          localStorage.clear()
          user.lastName = this.lastName.value
          user.email = this.email.value
          user.phoneNumber = this.phoneNumber.value
          user.cityName = this.city.value
          user.address = this.address.value
          user.postCode = this.postcode.value
          user.language = this.languageSelected
          localStorage.setItem('currentUser', JSON.stringify(user))
        })
      }
    }

    logout(){
    localStorage.clear()
    window.location.reload()
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
}
