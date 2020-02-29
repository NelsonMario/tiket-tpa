import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from 'src/app/models/flight';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { Airport } from 'src/app/models/airport';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { query } from '@angular/animations';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-flight',
  templateUrl: './admin-flight.component.html',
  styleUrls: ['./admin-flight.component.scss']
})
export class AdminFlightComponent implements OnInit {

  loaded = true

  airline = new FormControl()
  from = new FormControl()
  to = new FormControl()
  formattedDeparture = new FormControl()
  formattedArrival = new FormControl()
  inputDeparture = new FormControl()
  inputArrival = new FormControl()
  duration = new FormControl()
  price = new FormControl()
  tax = new FormControl()
  serviceCharge = new FormControl()

  updateAirline = new FormControl()
  updateFrom = new FormControl()
  updateTo = new FormControl()
  inputUpdateDeparture = new FormControl()
  inputUpdateArrival = new FormControl()
  updateDuration = new FormControl()
  updateFormattedDeparture = new FormControl()
  updateFormattedArrival = new FormControl()
  updatePrice = new FormControl()
  updateTax = new FormControl()
  updateServiceCharge = new FormControl()


  fromSchedule: string = ""
  toSchedule: string = ""
  updateFromSchedule = ""
  updateToSchedule = ""

  flight$ : Subscription
  flights : Flight[] = []
  airport$ : Subscription
  airports : Airport[] = []
  airline$ : Subscription
  airlines : Airport[] = []

  flightPagination: Flight[] = []

  constructor(private graphql: graphqlService, private _snackBar: MatSnackBar, private route: Router) {
    console.log(JSON.parse(localStorage.getItem("currentUser"))[0].email)
    if(localStorage.getItem("currentUser") == null)
      route.navigate([''])
    else{
      if(JSON.parse(localStorage.getItem("currentUser"))[0].email != "admin@admin.com")
        route.navigate([''])
    }

    this.flight$ = graphql.getAllFlight().subscribe(async query => {
      this.flights = query.data.flights
      await
      console.log("")
      this.flightPagination = this.flights
      console.log(this.flightPagination)
      this.loaded = !this.loaded
    })
    this.airport$ = graphql.getAirports().subscribe(async query =>{
      this.airports = query.data.airports
      await
      console.log(this.airports)
    })
    this.airline$ = graphql.getAirlines().subscribe(async query =>{
      this.airlines = query.data.airlines
    })

  }

  ngOnInit(): void {
    console.log(this.flightPagination)
  }

  insertData(){
    this.graphql.insertFlight(this.airline.value.id, this.from.value.id, this.to.value.id, this.formattedArrival.value+"T"+this.inputArrival.value+"Z", this.formattedDeparture.value+"T"+this.inputDeparture.value+"Z", parseInt(this.duration.value), parseInt(this.price.value), parseInt(this.tax.value), parseInt(this.serviceCharge.value)).subscribe(async query => {
      console.log(query.data.flights)
      await
      window.location.reload()
    })
  }

  deleteDataClick(id){
    if (confirm("Do you want to delete ?")) {
      this.deleteData(id)
    }
  }

  deleteData(id){
    this.graphql.removeFlight(id).subscribe(async query => {
      await this._snackBar.open("delete successfully", "close", {
        duration: 2000,
      })
    })
    setInterval(function(){window.location.reload()}, 2000);
  }

  updateData(id){
    try {
      this.graphql.updateFlight(id, this.updateAirline.value.id, this.updateFrom.value.id, this.updateTo.value.id, this.updateFormattedArrival.value+"T"+this.inputUpdateArrival.value+"Z", this.updateFormattedDeparture.value+"T"+this.inputUpdateDeparture.value+"Z", parseInt(this.updateDuration.value), parseInt(this.updatePrice.value), parseInt(this.updateTax.value), parseInt(this.updateServiceCharge.value)).subscribe(async query => {
        await this._snackBar.open("update successfully", "close", {
          duration: 2000,
        })
      })
      setInterval(function(){window.location.reload()}, 2000);
    } catch (error) {
      alert("There is no data")
    }

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.airline$.unsubscribe()
    this.airport$.unsubscribe()
    this.flight$.unsubscribe()
  }
}
