import { Injectable } from '@angular/core';
import { Station } from 'src/app/models/station';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  station: Station[] = []

  constructor() { }

  getStation(){
    return this.station
  }
}
