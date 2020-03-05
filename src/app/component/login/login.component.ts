import { Component, OnInit, ElementRef } from '@angular/core';
import { GoogleLoginService } from '../../service/google/google-login.service';
import { GoogleApiService } from 'ng-gapi';
import {ActivatedRoute} from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { graphqlService } from '../../service/graphql/graphql.service'
import { User } from 'src/app/models/user';
import { FormControl } from '@angular/forms';
import { graphql } from 'graphql';

declare const FB: any;
declare const gapi: any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public sheetId: string;
  public sheet: any;
  public foundSheet: any;
  public emailOrPhone = new FormControl('')
  public password = new FormControl('');
  public shown = "password"

  constructor(
    private route: ActivatedRoute,
    private dialogReference: MatDialogRef<any>,
    private graphql: graphqlService,
    private element: ElementRef,
    ) {
    };

    ngOnInit() {
      this.route.fragment.subscribe((fragment) => {
        console.log(fragment)
      });

      (window as any).fbAsyncInit = function() {
        FB.init({
          appId      : '993831117683156',
          cookie     : true,
          xfbml      : true,
          version    : 'v3.1'
        });
        FB.AppEvents.logPageView();
      };

      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: "602076487631-28k1qh3apnsm4510llsq5reejkq4qtlt.apps.googleusercontent.com",
        cookie_policy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.element.nativeElement.querySelector('#google'));
    });

  }
  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {

        let profile = googleUser.getBasicProfile();
        var userTemp : User[] = []
        var user : User = new User()
        user.firstName = profile.getName()
        user.email =  profile.getEmail()
        userTemp.push(user)
        localStorage.setItem('currentUser', JSON.stringify(userTemp))
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        that.googleRegister(that)

      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
    }

    public signInGoggle(){
      this.googleInit()
    }

    public googleRegister(that){
      var userTemp: User[];
      var googleUser: any = JSON.parse(localStorage.getItem('currentUser'))[0]
      console.log(googleUser.email)
      that.graphql.getUserByEmailOrPhone(googleUser.email).subscribe(async query=>{
        userTemp = query.data.userByEmailOrPhone;
        await
        localStorage.setItem('currentUser', JSON.stringify(userTemp))
        if(userTemp.length === 0){
          that.graphql.insertRegisterUser(googleUser.email, googleUser.firstName, "", "", "")
        }
        else{
          alert("Email Valid")
        }
      })
    }

    public signInFacebook(){
      console.log("submit login to facebook");
      let that = this
      FB.login((response)=>
        {
          console.log('submitLogin',response);
          if (response.authResponse)
          {
            console.log("Login Success");
            FB.api('/me', function(response2){
              console.log(response2)
              var userTemp : User[] = []
              var user : User = new User()
              user.firstName = response2['name']
              user.email = user.firstName.replace(/\s+/g, '') + "@gmail.com";
              userTemp.push(user)
              localStorage.setItem('currentUser', JSON.stringify(userTemp))
              that.googleRegister(that)
            }
          );
          }else
          {
            console.log('User login failed');
          }
      });

      var userTemp: User[];
      var googleUser: any = JSON.parse(localStorage.getItem('currentUser'))
      this.graphql.getUserByEmailOrPhone(JSON.parse(localStorage.getItem('currentUser')).email).subscribe(async query=>{
        userTemp = query.data.userByEmailOrPhone;
        await
        localStorage.setItem('currentUser', JSON.stringify(userTemp))
        if(userTemp.length === 0)
          this.graphql.insertRegisterUser(googleUser.email, googleUser.firstName, "", "", "")
        else{
          alert("Email Valid")
        }
      })
    }

    login(){
      var userTemp: User[];
      this.graphql.getUserByEmailOrPhone(this.emailOrPhone.value).subscribe(async query=>{
        userTemp = query.data.userByEmailOrPhone;
        await
        localStorage.setItem('currentUser', JSON.stringify(userTemp))
        if(userTemp.length === 0)
          this.dialogReference.close(this.emailOrPhone.value);
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


    setShown(){
      this.shown = this.shown ==  "password" ? "text" : "password"
    }
}
