import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FlightService } from 'src/app/service/flight/flight.service';
import { Flight } from 'src/app/models/flight';
import { Airport } from 'src/app/models/airport';
import { AirportService } from 'src/app/service/airport/airport.service';
import { FormControl, Validators } from '@angular/forms';
import { Filter } from 'src/app/models/filter';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Airline } from 'src/app/models/airline';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flight-page',
  templateUrl: './flight-page.component.html',
  styleUrls: ['./flight-page.component.scss']
})
export class FlightPageComponent implements OnInit {

  departures: Filter[] = [
    {name: "00:00 - 06:00", active: false,startTime: 0, endTime: 6},
    {name: "06:00 - 12:00", active: false,startTime: 6, endTime: 12},
    {name: "12:00 - 18:00", active: false,startTime: 12, endTime: 18},
    {name: "18:00 - 24:00", active: false,startTime: 18, endTime: 24}
  ]

  arrivals: Filter[] = [
    {name: "00:00 - 06:00", active: false, startTime: 0, endTime: 6},
    {name: "06:00 - 12:00", active: false, startTime: 6, endTime: 12},
    {name: "12:00 - 18:00", active: false, startTime: 12, endTime: 18},
    {name: "18:00 - 24:00", active: false, startTime: 18, endTime: 24}
  ]

  transits: any[] = [
    {name: "Langsung", active: false, transit: 0},
    {name: "1 Transit", active: false, transit: 1},
    {name: "2+ Transit", active: false, transit: 2}
  ]

  airlines: any [] = []
  flights: Flight[] = []
  airports: Airport[] = []
  facilities: string[] = ['']
  filterFacility: any[] = []

  from: string
  to: string
  airport$: Subscription;
  departureFlight$: Subscription
  arrivalFlight$: Subscription
  fromAirport = new FormControl('', [Validators.required]);
  toAirport = new FormControl('', [Validators.required]);
  formattedDeparture = new FormControl('', [Validators.required]);
  formattedArrival = new FormControl('', [Validators.required]);
  @Output() outputHidden = new EventEmitter;
  isHidden:boolean = true;
  buy: boolean = false
  fromSchedule: string = ""
  toSchedule: string = ""

  realFlights : any[] = []
  showData = 5
  flight$ : Subscription
  tempFlight : any[] = []
  tempCount = 0
  dataCount = 0
  pollingData : any

  hotels$: Subscription
  tempHotel: any

  constructor(private flightService: FlightService, private airportService: AirportService, private graphqlService: graphqlService, private router: Router,  private http: HttpClient) {
    this.realFlights = flightService.flights
    this.loadData()
    console.log(this.realFlights)
    this.from = flightService.from
    this.to = flightService.to


    var airlineTemp = []
    console.log(this.flightService.flights)
    this.flightService.flights.forEach(element => {
      airlineTemp.push(element.airline.name)
    });


    airlineTemp = airlineTemp.filter((airlineName, i, arr) => arr.findIndex(a=>a==airlineName)==i)

    airlineTemp.forEach(element => {
      this.airlines.push({
        name: element,
        active: false
      })
    });


    var facilityTemp = []

    for(let i = 0 ; i < this.flights.length ; i++){
      for(let j = 0 ; j < this.flights[i].flightFacility.length ; j++){
        facilityTemp[j] = this.flights[i].flightFacility[j].facility.name
      }
    }
    facilityTemp = facilityTemp.filter((facilityTempName, i, arr) => arr.findIndex(a=>a==facilityTempName)==i)

    facilityTemp.forEach(element => {
      this.filterFacility.push({
        name: element,
        active: false
      })
    });

  this.flight$ = this.graphqlService.getAllFlight().subscribe(async query => {
    this.tempFlight = query.data.flights;
    await
    console.log(query.data.flights)
    console.log(this.tempFlight['length'])
    this.tempCount = this.tempFlight['length']
    }
  );

  this.pollingData = Observable.interval(5000).switchMap(() => this.http.get('http://localhost:8080/?query=%7B%0A%09flights%7B%0A%20%20%20%20id%0A%20%20%7D%0A%7D')).map((data) => JSON.stringify(data['data']['flights']))
    .subscribe((data) => {
      let flightData = JSON.parse(data)
      this.dataCount = flightData['length']
      console.log(this.dataCount + " " + this.tempCount)
      if(this.tempCount != this.dataCount){
        alert("New Flight Has Publish")
        this.tempCount = this.dataCount
        return this.tempCount
      }
    });

    window.onscroll = this.scroll

  }

  scroll = (event): void => {
    if(window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      this.showData += 5
      if(this.realFlights.length >= this.showData) {
        for (let index = this.showData-5; index < this.showData; index++) {
          this.flights.push(this.realFlights[index])
        }
      } else {
        for (let index = this.showData-5; index < this.realFlights.length; index++) {
          this.flights.push(this.realFlights[index])
        }
      }
    }
  }

  public loadData() {
    if(this.realFlights.length >= this.showData) {
      for (let index = 0; index < this.showData; index++) {
        this.flights.push(this.realFlights[index])
      }
    }
    else {
      for (let index = 0; index < this.realFlights.length; index++) {
        this.flights.push(this.realFlights[index])
      }
    }
  }

  searchFlight(){
    if(this.formattedArrival.value ==  null)
    this.formattedArrival.setValue("")

    this.departureFlight$ = this.graphqlService.getFlightsBySchedule(this.fromAirport.value.city, this.toAirport.value.city, this.formattedDeparture.value, this.formattedArrival.value).subscribe(async query=>{
      this.flightService.flights = query.data.flightBySchedule
      await
      console.log(query.data.flightBySchedule)
      console.log(this.formattedDeparture.value)
      console.log(this.formattedArrival.value)
      this.flightService.from = this.fromAirport.value.city
      this.flightService.to = this.toAirport.value.city

      this.router.navigate(["/flight"])
    })
  }

  filterValidation(index){
    if(!this.airlineValidation(index))
      return false
    else if(!this.facilityValidation(index))
      return false
    else if(!this.departureTimeValidation(index))
      return false
    else if(!this.arrivalTimeValidation(index))
      return false
    else if(!this.transitValidation(index))
      return false
    return true
  }

  departureTimeValidation(index){
    var unchecked: Boolean = true;

    for(let i = 0 ; i < this.departures.length ; i++){
      if(this.departures[i].active){
        unchecked = false;
        break;
      }
    }

    if(unchecked)return true;


    var departureFlight = new Date(this.flights[index].departure.toString()).getUTCHours()

    for(let i=0 ; i<this.departures.length ; i++){
      var element = this.departures[i];
      if(element.active && departureFlight >= element.startTime && departureFlight <= element.endTime){
        return true;
      }
    }
    return false;
  }

  facilityValidation(index){
    var unchecked: Boolean = true;

    for(let i = 0 ; i < this.filterFacility.length ; i++){
      if(this.filterFacility[i].active){
        unchecked = false;
        break;
      }
    }

    if(unchecked)return true;


    var flightFacility = this.flights[index].flightFacility
    for(let i=0 ; i<flightFacility.length ; i++){
      for(let j=0 ; j<this.filterFacility.length ; j++)
        var element = this.filterFacility[j].name
        if(flightFacility[i].facility.name == element){
          return true
        }
    }
    return false;
  }

  arrivalTimeValidation(index){
    var unchecked: Boolean = true;

    for(let i = 0 ; i < this.arrivals.length ; i++){
      if(this.arrivals[i].active){
        unchecked = false;
        break;
      }
    }

    if(unchecked)return true;


    var arrivalFlight = new Date(this.flights[index].arrival.toString()).getUTCHours()

    for(let i=0 ; i<this.arrivals.length ; i++){
      var element = this.arrivals[i];
      if(element.active && arrivalFlight >= element.startTime && arrivalFlight <= element.endTime){
        return true;
      }
    }
    return false;
  }

  airlineValidation(index){
    var unchecked: Boolean = true;

    for(let i = 0 ; i < this.airlines.length ; i++){
      if(this.airlines[i].active){
        unchecked = false;
        break;
      }
    }

    if(unchecked)return true;


    var airlineName = this.flightService.flights[index].airline.name

    for(let i=0 ; i<this.airlines.length ; i++){
      var element = this.airlines[i];
      if(element.active && airlineName === element.name){
        return true;
      }
    }
    return false;
  }

  transitValidation(index){
    var unchecked: Boolean = true;

    for(let i = 0 ; i < this.transits.length ; i++){
      if(this.transits[i].active){
        unchecked = false;
        break;
      }
    }

    if(unchecked)return true;


    var transits = this.flights[index].flightRoutes.length

    for(let i=0 ; i<this.transits.length ; i++){
      var element = this.transits[i];
      if(element.active && transits == element.transit || transits >= 2){
        return true;
      }
    }
    return false;
  }

  setBuy(){
    this.buy = !this.buy
    console.log(this.buy)
  }

  ngOnInit() {
    this.airports = this.airportService.airports

    for(let i = 0 ; i < this.flights.length ; i++){
      for(let j = 0 ; j < this.flights[i].flightFacility.length ; j++){
        this.facilities[i] += (this.flights[i].flightFacility[j].facility.name + "\n")
      }
    }
  }

  toggleOverlay(event){
    if(event.target.id === "" && this.isHidden === false)
      this.isHidden = !this.isHidden;
    this.isHidden = !this.isHidden;
    this.outputHidden.emit(this.outputHidden)
    console.log(this.isHidden)
  }

  priceSort(){
    this.flights.sort(function(a, b){return a.price - b.price})
  }

  durationSort(){
    this.flights.sort(function(a, b){return parseInt(a.duration) -  parseInt(b.duration)})
  }
}
