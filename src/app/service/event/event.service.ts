import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  event: any[] = []

  constructor() { }

  getEvents(){
    console.log(this.event)
    return this.event
  }
}
