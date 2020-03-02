import { Component, OnInit } from '@angular/core';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { query } from '@angular/animations';
import { async } from '@angular/core/testing';
import { parse } from 'path';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-hotel',
  templateUrl: './admin-hotel.component.html',
  styleUrls: ['./admin-hotel.component.scss']
})
export class AdminHotelComponent implements OnInit {

  loaded = true

  location = new FormControl()
  hotelName = new FormControl()
  rating = new FormControl()
  type = new FormControl()
  hotelLat = new FormControl()
  hotelLng = new FormControl()

  updateLocation = new FormControl()
  updateHotelName = new FormControl()
  updateRating = new FormControl()
  updateType = new FormControl()

  insertFacility = new FormControl()

  location$ : Subscription
  locations : any[] = []
  hotel$ : Subscription
  hotels : any[] = []
  facility$ : Subscription
  facilities : any[] = []

  realHotel : any[] = []
  pageCount : any[] = []
  constructor(private graphql: graphqlService, private _snackBar: MatSnackBar, private route: Router) {

    if(localStorage.getItem("currentUser") == null)
      route.navigate([''])
    else{
      if(JSON.parse(localStorage.getItem("currentUser"))[0].email != "admin@admin.com")
        route.navigate([''])
    }
    // this.flight$ = graphql.getAllFlight().subscribe(async query => {
    //   this.flights = query.data.flights
    //   await
    //   console.log("")
    //   this.flightPagination = this.flights
    //   console.log(this.flightPagination)
    //   this.loaded = !this.loaded
    // })
    // this.airport$ = graphql.getAirports().subscribe(async query =>{
    //   this.airports = query.data.airports
    //   await
    //   console.log(this.airports)
    // })
    // this.airline$ = graphql.getAirlines().subscribe(async query =>{
    //   this.airlines = query.data.airlines
    // })

      this.location$ = graphql.getAllLocation().subscribe(async query => {
        this.locations = query.data.location
        await
        console.log(this.locations)
      })
      this.hotel$ = graphql.getAllHotel().subscribe(async query => {
        this.realHotel = query.data.hotels
        await
        console.log(this.realHotel)
        this.pushToPagination()
        this.loaded = !this.loaded
      })
      this.facility$ = graphql.getAllFacility().subscribe(async query => {
        this.facilities = query.data.facilities
        await
        console.log(this.facilities)
      })

  }

  ngOnInit(): void {
    // console.log(this.flightPagination)
  }


  deleteDataClick(id){
    if (confirm("Do you want to delete ?")) {
      this.deleteData(id)
    }
  }

  insertData(){
    this.graphql.insertHotel(this.hotelName.value, parseInt(this.rating.value), this.type.value, parseInt(this.location.value.id), parseFloat(this.hotelLat.value), parseFloat(this.hotelLng.value)).subscribe(async query => {
      console.log(query.data.hotel)
      await
      window.location.reload()
    })
  }

  deleteData(id){
    this.graphql.removeHotel(id).subscribe(async query => {
      await this._snackBar.open("delete successfully", "close", {
        duration: 2000,
      })
    })
    setInterval(function(){window.location.reload()}, 2000);
  }

  updateData(id){
    try {
      this.graphql.updateHotel(id, this.updateHotelName.value, parseInt(this.updateRating.value)).subscribe(async query => {
        await this._snackBar.open("update successfully", "close", {
          duration: 2000,
        })
      })
      setInterval(function(){window.location.reload()}, 2000);
    } catch (error) {
      alert("There is no data")
    }

  }
  insertFacilityClick(){

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.hotel$.unsubscribe()
    this.facility$.unsubscribe()
  }

  pushToPagination() {
    for (let i = 0; i < this.realHotel.length; i++) {
      if(i < 5) this.hotels.push(this.realHotel[i])
      if(i % 5 == 0) this.pageCount.push(1 + (i/5))
    }
  }

  changePage(currPage) {
    this.hotels = []
    for (let i = currPage * 5; i < (currPage+1) * 5 && i < this.realHotel.length; i++) {
      this.hotels.push(this.realHotel[i])
      }
    }
}
