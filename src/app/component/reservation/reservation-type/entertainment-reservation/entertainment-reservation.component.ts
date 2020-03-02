import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { LocationService } from 'src/app/service/location/location.service';
import { EventService } from 'src/app/service/event/event.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-entertainment-reservation',
  templateUrl: './entertainment-reservation.component.html',
  styleUrls: ['./entertainment-reservation.component.scss']
})
export class EntertainmentReservationComponent implements OnInit {

  locations : any[] = []
  location$ : Subscription
  location = new FormControl('', [Validators.required]);
  isHidden : boolean = true
  @Output() outputHidden = new EventEmitter

  displayLocation : any [] = []
  locationTemp: any[] = []
  displayCity : any [] = []
  cityTemp : any [] = []

  event$ : Subscription
  constructor(private graphql: graphqlService, private locationService: LocationService, private eventService: EventService, private routes: Router) { }

  ngOnInit(): void {
    this.location$ = this.graphql.getAllLocation().subscribe(async query => {
      this.locationService.location = query.data.location
      await
      console.log(this.locationService.location)
      this.locations = this.locationService.getLocation()
      this.locations.forEach(elements => {
        this.displayLocation.push(elements.country)
      })

      this.locationTemp = this.displayLocation.filter((locationName, i, arr) => arr.findIndex(a=>a==locationName)==i)
      this.displayLocation = []
      this.locationTemp.forEach(element => {
        this.displayLocation.push(element)
      })

      this.locations.forEach(elements => {
        this.displayCity.push({
          city: elements.city,
          country: elements.country
        })
      })

    })
  }

  click(event){
    this.event$ = this.graphql.getEventByLocation(event.path[1].id).subscribe(async query => {
      this.eventService.event = query.data.eventByLocation
      await
      console.log(query.data.eventByLocation)
      console.log(this.eventService.event)
      this.routes.navigate(['event-search'])
    })
  }

}
