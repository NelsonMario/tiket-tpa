import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocationService } from 'src/app/service/location/location.service';
import { FormControl } from '@angular/forms';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import * as L from 'leaflet'
import { Router } from '@angular/router';
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

  constructor(private hotelService: HotelService, private locationService: LocationService, private route: Router) {
    this.location = this.hotelService.location
    this.fromDate = this.hotelService.fromDate
    this.toDate = this.hotelService.toDate
    this.locations = this.locationService.getLocation()
    this.hotels = hotelService.hotels
    this.maximumPrice.setValue(100000000)
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
    this.route.navigate(['detail-hotel'])
  }

  count(i){
    return new Array(i)
  }

  setOpenMap(){
    this.openMap = !this.openMap


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
        .bindPopup(element.name + "\n" + element.hotel.hotelRoom[0].room.price);
        marker.hotel = element
      })

    }
  }

  groupClick(event) {
    this.displayHotel = event.layer.hotel
    alert("Hotel Name : " + this.displayHotel.name + "\n" + "Hotel Rating : " +this.displayHotel.rating + "Stars")
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
}
