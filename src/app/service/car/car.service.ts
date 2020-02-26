import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  cars: any[] = []
  vendors: any[] = []
  fromDate : string
  toDate : string
  location: string
  constructor() { }

  getCar(){
    return this.cars;
  }

  getLocation(){
    return this.location
  }

  getVendor(){
    return this.vendors
  }
}
