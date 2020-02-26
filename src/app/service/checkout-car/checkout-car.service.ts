import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutCarService {

  car : any
  constructor() { }

  getCar(){
    return this.car
  }
}
