import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Railroad } from 'src/app/models/railroad';
import { Subscription } from 'rxjs';
import { Station } from 'src/app/models/station';
import { Train } from 'src/app/models/train';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-admin-train',
  templateUrl: './admin-train.component.html',
  styleUrls: ['./admin-train.component.scss']
})
export class AdminTrainComponent implements OnInit {

  loaded = true

  train = new FormControl()
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

  updateTrain = new FormControl()
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

  railroad$ : Subscription
  railroads : Railroad[] = []
  station$ : Subscription
  stations : Station[] = []
  train$ : Subscription
  trains : Train[] = []

  constructor(private graphql: graphqlService, private _snackBar: MatSnackBar, private route: Router) {

    if(localStorage.getItem("currentUser") == null)
      route.navigate([''])
    else{
      if(JSON.parse(localStorage.getItem("currentUser"))[0].email != "admin@admin.com")
        route.navigate([''])
    }

    this.railroad$ = graphql.getAllRailroad().subscribe(async query => {
      this.railroads = query.data.railroads
      await
      console.log(this.railroads)
      this.loaded = !this.loaded
    })
    this.station$ = graphql.getAllRealStation().subscribe(async query =>{
      this.stations = query.data.stations
      await
      console.log(this.stations)
    })
    this.train$ = graphql.getAllTrain().subscribe(async query =>{
      this.trains = query.data.trains
      await
      console.log(this.trains)
    })
  }

  ngOnInit(): void {
  }

  insertData(){
    this.graphql.insertRailroad(this.train.value.id, this.from.value.id, this.to.value.id, this.formattedArrival.value+"T"+this.inputArrival.value+"Z", this.formattedDeparture.value+"T"+this.inputDeparture.value+"Z", parseInt(this.duration.value), parseInt(this.price.value), parseInt(this.tax.value), parseInt(this.serviceCharge.value)).subscribe(async query => {
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
    this.graphql.removeRailroad(id).subscribe(async query => {
      await this._snackBar.open("delete successfully", "close", {
        duration: 2000,
      })
    })
    setInterval(function(){window.location.reload()}, 2000);
  }

  updateData(id){
    try {
      this.graphql.updateRailroad(id, this.updateTrain.value.id, this.updateFrom.value.id, this.updateTo.value.id, this.updateFormattedArrival.value+"T"+this.inputUpdateArrival.value+"Z", this.updateFormattedDeparture.value+"T"+this.inputUpdateDeparture.value+"Z", parseInt(this.updateDuration.value), parseInt(this.updatePrice.value), parseInt(this.updateTax.value), parseInt(this.updateServiceCharge.value)).subscribe(async query => {
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
    this.train$.unsubscribe()
    this.station$.unsubscribe()
    this.railroad$.unsubscribe()
  }

}
