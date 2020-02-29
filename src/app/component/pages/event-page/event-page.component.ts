import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { LocationService } from 'src/app/service/location/location.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {

  isHidden : boolean = true
  @Output() outputHidden = new EventEmitter
  attraction$: Subscription
  event$: Subscription
  activities$: Subscription
  attractions: any[] = []
  events: [] = []
  activities: [] = []

  constructor(private graphql: graphqlService, private locationService: LocationService) { }

  ngOnInit(): void {
    this.attraction$ = this.graphql.getEventByCategory("Attractions").subscribe(async query => {
      this.attractions = query.data.eventsByCategory
    })
    this.event$ = this.graphql.getEventByCategory("Events").subscribe(async query => {
      this.events = query.data.eventsByCategory
    })
    this.activities$ = this.graphql.getEventByCategory("Activities").subscribe(async query => {
      this.activities = query.data.eventsByCategory
    })
  }


  toggleOverlay(event){
    if(event.target.id === "" && this.isHidden === false)
      this.isHidden = !this.isHidden;
    this.isHidden = !this.isHidden;
    this.outputHidden.emit(this.outputHidden)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.attraction$.unsubscribe()
    this.event$.unsubscribe()
    this.activities$.unsubscribe()
  }
}
