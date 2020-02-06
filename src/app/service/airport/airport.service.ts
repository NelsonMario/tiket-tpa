import { Injectable } from '@angular/core';
import { Airport } from 'src/app/models/airport';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  airports: Airport[] = []

  constructor() {

  }

  getAirports(){
    return this.airports
  }
}
