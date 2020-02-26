import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  location: any[] = []

  constructor() { }

  getLocation(){
    return this.location
  }
}
