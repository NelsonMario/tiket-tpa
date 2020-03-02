import { Component, OnInit } from '@angular/core';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { EventService } from 'src/app/service/event/event.service';
import { Subscription } from 'rxjs';
import { async } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-search-page',
  templateUrl: './event-search-page.component.html',
  styleUrls: ['./event-search-page.component.scss']
})
export class EventSearchPageComponent implements OnInit {

  events : any[] = []
  nearestEvent$ : Subscription
  nearestEvents : any[] = []
  loaded : true
  categories: any[] = [
    {name: "Activities", active: false},
    {name: "Events", active: false},
    {name: "Attractions", active: false}
  ]

  minimumPrice = new FormControl()
  maximumPrice = new FormControl()

  realEvent : any[] = []
  showData = 5
  constructor(private graphql: graphqlService, private eventService: EventService, private route: Router) { }

  ngOnInit(): void {

    this.realEvent = this.eventService.getEvents()
    this.loadData()
    console.log(this.eventService.getEvents())

    this.nearestEvent$ = this.graphql.getNearestEvent(this.realEvent[0].location.city).subscribe(async query => {
      this.nearestEvents = query.data.nearestEvent
      await
      console.log(this.nearestEvents)
    })
    this.minimumPrice.setValue(0)
    this.maximumPrice.setValue(1000000)

    window.onscroll = this.scroll
  }

  scroll = (event): void => {
    console.log(window.scrollY + window.innerHeight+" "+document.body.scrollHeight)
    if(window.scrollY + window.innerHeight + 3 >= document.body.scrollHeight) {
      this.showData += 5
      if(this.realEvent.length >= this.showData) {
        for (let index = this.showData-5; index < this.showData; index++) {
          this.events.push(this.realEvent[index])
        }
      } else {
        for (let index = this.showData-5; index < this.realEvent.length; index++) {
          this.events.push(this.realEvent[index])
        }
      }
    }
  }

  public loadData() {
    if(this.realEvent.length >= this.showData) {
      for (let index = 0; index < this.showData; index++) {
        this.events.push(this.realEvent[index])
      }
    }
    else {
      for (let index = 0; index < this.realEvent.length; index++) {
        this.events.push(this.realEvent[index])
      }
    }
  }

  filterValidation(index){
    if(!this.priceValidation(index))
      //if return true than dont show
      return false
    if(!this.categoryValidation(index))
      //if return true than dont show
      return false
    return true
  }

  priceValidation(index){
    var model = this.events[index].eventDetail[0].price
    if(model >= parseInt(this.minimumPrice.value) && model <= parseInt(this.maximumPrice.value))
      return false;
    return true
  }

  categoryValidation(index){
    var unchecked: Boolean = true;

    for(let i = 0 ; i < this.categories.length ; i++){
      if(this.categories[i].active){
        unchecked = false;
        break;
      }
    }

    if(unchecked)return true;



    var classRoute = this.events[index].category
    for(let i=0 ; i<this.categories.length ; i++){
      var element = this.categories[i];
      if(element.active && classRoute === element.name){
        return true;
      }
    }
    return false;
  }

  cheapPriceSort(){
    this.events.sort(function(a, b){return a.eventDetail[0].price - b.eventDetail[0].price})
  }

  expensivePriceSort(){
    this.events.sort(function(a, b){return b.eventDetail[0].price - a.eventDetail[0].price})
  }

  order(i){
    this.route.navigate(['event-search', i])
  }
}
