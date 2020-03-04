import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  hotels: any[] = []
  rooms: any[] = []
  fromDate : string
  toDate : string
  location: string
  hotel: any
  night: any
  person: any

  constructor() { }

}
