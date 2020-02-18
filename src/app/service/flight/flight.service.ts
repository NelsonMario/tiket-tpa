import { Injectable } from '@angular/core';
import { Flight } from 'src/app/models/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  flights: Flight[] = []
  from : string
  to : string
  way: boolean
  constructor() { }

}
