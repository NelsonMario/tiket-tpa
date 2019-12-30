import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from 'ng-gapi';
import { GoogleLoginService } from '../../service/google/google-login.service';
import { SheetResourceService } from '../../service/google/sheet-resource.service';
import { GoogleApiService } from 'ng-gapi';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public sheetId: string;
  public sheet: any;
  public foundSheet: any;

  constructor(private userService: GoogleLoginService,
    private sheetResource: SheetResourceService,
    private route: ActivatedRoute,
    private authService: GoogleAuthService,
    private gapiService: GoogleApiService) {
    this.gapiService.onLoad().subscribe();
    
    };
    
    foo(){
      var google = document.getElementById('google');
      console.log(google);
    }

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
  
  
  
}
