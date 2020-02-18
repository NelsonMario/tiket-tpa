import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Airport } from 'src/app/models/airport';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { Subscription } from 'rxjs';
import { Flight } from 'src/app/models/flight';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/service/flight/flight.service';
import { AirportService } from 'src/app/service/airport/airport.service';

@Component({
  selector: 'app-flight-reservation',
  templateUrl: './flight-reservation.component.html',
  styleUrls: ['./flight-reservation.component.scss']
})
export class FlightReservationComponent implements OnInit {

  way: boolean = true;
  airports: Airport[] = [];
  airport$: Subscription;
  departureFlight$: Subscription
  arrivalFlight$: Subscription
  fromAirport = new FormControl('', [Validators.required]);
  toAirport = new FormControl('', [Validators.required]);
  formattedDeparture = new FormControl('', [Validators.required]);
  formattedArrival = new FormControl('', [Validators.required]);

  constructor(private graphqlService: graphqlService, private router: Router, private flightService: FlightService, private airportService: AirportService) { }

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
  checkWay(){
    this.way = !this.way
    console.log(this.way)
  }
  ngOnInit() {
    this.airport$ = this.graphqlService.getAllAirport().subscribe(async query=>{
      this.airportService.airports = query.data.distinctAirports;
      this.airports = this.airportService.getAirports()
    })
  }
  ngOnDestroy(): void {
    if(this.flightService.flights.length != 0 && this.flightService.flights.length != 3){
      this.departureFlight$.unsubscribe()
    }
    this.airport$.unsubscribe()
  }
}
