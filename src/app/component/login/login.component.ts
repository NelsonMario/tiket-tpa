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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public sheetId: string;
  public sheet: any;
  public foundSheet: any;
  public input: string = "";

  constructor(private userService: GoogleLoginService,
    private sheetResource: SheetResourceService,
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
      })
    }

    public isLoggedIn(): boolean {
      return this.userService.isUserSignedIn();
    }


    public signIn() {
      this.userService.signIn();
    }

    getString($event){
      this.input = $event;
    }

    login(){
      var userTemp: User[]  ;
      console.log(this.input);
      this.graphql.getUserByEmailOrPhone(this.input).subscribe(async query=>{
        userTemp = query.data.userByEmailOrPhone;
        await
        console.log(userTemp);
        this.myAuthService.getUser(userTemp);
        if(userTemp.length === 0)
          this.dialogReference.close(this.input);
        else
          console.log(userTemp[0].firstName);
      })

  }
}
