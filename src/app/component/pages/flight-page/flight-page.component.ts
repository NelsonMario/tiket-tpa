import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FlightService } from 'src/app/service/flight/flight.service';
import { Flight } from 'src/app/models/flight';
import { Airport } from 'src/app/models/airport';
import { AirportService } from 'src/app/service/airport/airport.service';
import { FormControl, Validators } from '@angular/forms';
import { Filter } from 'src/app/models/filter';

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

  flights: Flight[] = []
  airports: Airport[] = []
  facilities: string[] = ['']
  fromAirport = new FormControl('', [Validators.required]);
  toAirport = new FormControl('', [Validators.required]);
  @Output() outputHidden = new EventEmitter;
  isHidden:boolean = true;


  constructor(private flightService: FlightService, private airportService: AirportService) {
    this.flights = flightService.flights
    console.log(this.flights[0])

  }

  filterValidation(index){
    if(!this.departureTimeValidation(index))
      //if return true than dont show
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
}
