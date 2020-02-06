import { Component, OnInit, Input } from '@angular/core';
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

  @Input() way: boolean = false;
  airports: Airport[] = [];
  airport$: Subscription;
  flight$: Subscription
  fromAirport = new FormControl('', [Validators.required]);
  toAirport = new FormControl('', [Validators.required]);

  constructor(private graphqlService: graphqlService, private router: Router, private flightService: FlightService, private airportService: AirportService) { }

  searchFlight(){
    this.flight$ = this.graphqlService.getFlightsByFromAndTo(this.fromAirport.value.city, this.toAirport.value.city).subscribe(async query=>{
      this.flightService.flights = query.data.flightByFromAndTo
      await
      console.log(this.flightService.flights)
      this.router.navigate(["/flight"])
    })
  }

  ngOnInit() {
    this.airport$ = this.graphqlService.getAllAirport().subscribe(async query=>{
      this.airportService.airports = query.data.distinctAirports;
      this.airports = this.airportService.getAirports()
    })
  }
  ngOnDestroy(): void {
    if(this.flightService.flights.length != 0 && this.flightService.flights.length != 3){
      this.flight$.unsubscribe()
    }
    this.airport$.unsubscribe()
  }
}
