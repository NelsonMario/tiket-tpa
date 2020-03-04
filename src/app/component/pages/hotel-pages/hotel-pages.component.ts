import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocationService } from 'src/app/service/location/location.service';
import { FormControl } from '@angular/forms';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import * as L from 'leaflet'
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-hotel-pages',
  templateUrl: './hotel-pages.component.html',
  styleUrls: ['./hotel-pages.component.scss']
})
export class HotelPagesComponent implements OnInit {

  location : string
  fromDate : string
  toDate : string
  isHidden: boolean = true
  @Output('')outputHidden = new EventEmitter

  formattedStart = new FormControl()
  formattedEnd = new FormControl()
  minimumPrice = new FormControl();
  maximumPrice = new FormControl();

  locationForm = new FormControl()
  locations :any[] = []
  hotels :any[] = []

  stars : any[] = []
  buy: boolean = false
  openMap: boolean = false

  map : L.Map
  marker : L.Marker[] = []

  displayHotel: any
  click = false

  cssMap = document.getElementById("map")

  tempHotel : any
  tempCount : any
  pollingData:any
  dataCount:any

  hotel$ : Subscription

  displayDetail : any = "false"
  constructor(private hotelService: HotelService, private locationService: LocationService, private route: Router, private graphqlService: graphqlService, private http:HttpClient) {
    this.locations = this.locationService.getLocation()
    this.location = this.hotelService.location
    this.fromDate = this.hotelService.fromDate
    this.toDate = this.hotelService.toDate
    this.hotels = this.hotelService.hotels
    this.maximumPrice.setValue(1000)


  this.hotel$ = this.graphqlService.getAllHotel().subscribe(async query => {
    this.tempHotel = query.data.hotels;
    await
    console.log(this.tempHotel)
    this.tempCount = this.tempHotel.length
    }
  );

  this.pollingData = Observable.interval(5000).switchMap(() => this.http.get('http://localhost:8080/api/success?query=%7B%0A%09hotels%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%7D%0A%7D')).map((data) => JSON.stringify(data['data']['hotels']))
    .subscribe((data) => {
      let hotelData = JSON.parse(data)
      this.dataCount = hotelData['length']
      console.log(this.dataCount + " " + this.tempCount)
      if(this.tempCount != this.dataCount){
        alert("New Hotel Has Publish")
        this.tempCount = this.dataCount
        return this.tempCount, window.location.reload()
      }
    });
  }


  filterValidation(index){
    if(!this.priceValidation(index))
      //if return true than dont show
      return false
    return true
  }

  priceValidation(index){
    var model = this.hotels[index].hotelRoom[0].room.price
    if(model >= this.minimumPrice.value && model <= this.maximumPrice.value)
      return true;
    return false
  }

  ngOnInit(): void {


    console.log(this.hotels)
  }

  toggleOverlay(event){
    if(event.target.id === "" && this.isHidden === false)
      this.isHidden = !this.isHidden;
    this.isHidden = !this.isHidden;
    this.outputHidden.emit(this.outputHidden)
    console.log(this.isHidden)
  }

  redirectToDetailPage(event){
    this.hotelService.hotel = this.hotels[event.path[2].id]
    this.route.navigate(['search-hotel', event.path[2].id])
  }

  count(i){
    return new Array(i)
  }

  setOpenMap(){
    this.openMap = !this.openMap
    console.log(this.hotels)
    document.getElementById("map").style.display = "block"
    if(this.openMap){
      this.map = L.map('map', {
        center: [106.8223, -6.1818],
        zoom: 13
      })

      this.map.setView([-6.163820, 106.8223], 13);

      var markersLayer = L.featureGroup().addTo(this.map).on("click", this.groupClick)
      var marker
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.hotels.forEach(element => {
        marker = L.marker([element.hotelLat, element.hotelLng]).addTo(markersLayer)
        .bindPopup(element.name + "\n" + element.hotelRoom[0].room.price);
        marker.hotel = element
      })

    }else{
      document.getElementById("map").style.display = "none"
    }
  }

  groupClick(event) {
    this.displayHotel = event.layer.hotel
    alert("Hotel Name : " + this.displayHotel.name + "\n" + "Hotel Rating : " +this.displayHotel.rating + "Stars")
    return this.displayDetail = "true"
  }


  cheapPriceSort(){
    this.hotels.sort(function(a, b){return a.hotelRoom[0].room.price - b.hotelRoom[0].room.price})
  }

  expensivePriceSort(){
    this.hotels.sort(function(a, b){return b.hotelRoom[0].room.price - a.hotelRoom[0].room.price})
  }

  ratingSort(){
    this.hotels.sort(function(a, b){return a.rating - b.rating})
  }

  starSort(){
    this.hotels.sort(function(a, b){return a.rating - b.rating})
  }

  nameSort(){
    this.hotels.sort(function(a, b){return a.name.localeCompare(b.name)})
  }

  searchHotel(){
    this.hotel$ = this.graphqlService.getHotelByLocation(this.locationForm.value.city).subscribe(async query => {
      this.hotels = query.data.hotelByLocation
      await
      console.log(this.locationForm.value.city)
      this.hotelService.hotels = this.hotels
      this.hotelService.location = this.locationForm.value.city
      this.hotelService.fromDate = this.formattedStart.value
      this.hotelService.toDate = this.formattedEnd.value
      window.location.href = window.location.href
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.hotel$.unsubscribe()
  }
}
