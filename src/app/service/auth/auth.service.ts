import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:User;

  constructor() { }

  getUser(user){
    this.user = user;
  }


}
