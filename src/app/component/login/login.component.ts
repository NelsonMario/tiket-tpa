import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from 'ng-gapi';
import { GoogleLoginService } from '../../service/google/google-login.service';
import { SheetResourceService } from '../../service/google/sheet-resource.service';
import { GoogleApiService } from 'ng-gapi';
import {ActivatedRoute} from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { graphqlService } from '../../service/graphql/graphql.service'
import { async } from '@angular/core/testing';
import { query } from '@angular/animations';
import { User } from 'src/app/models/user';
import { tokenName } from '@angular/compiler';
import { FormControl } from '@angular/forms';

declare const FB: any;
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
    private userService: GoogleLoginService,
    private route: ActivatedRoute,
    private authService: GoogleAuthService,
    private gapiService: GoogleApiService,
    private dialogReference: MatDialogRef<any>,
    private myAuthService: AuthService,
    private graphql: graphqlService) {
    this.gapiService.onLoad().subscribe();

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

    public isLoggedIn(): boolean {
      return this.userService.isUserSignedIn();
    }


    public signInGoogle() {
      this.userService.signIn();
    }

    public signInFacebook(){
      console.log("submit login to facebook");
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
            }
          );
          }else
          {
            console.log('User login failed');
          }
      });
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
