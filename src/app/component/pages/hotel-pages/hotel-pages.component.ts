import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocationService } from 'src/app/service/location/location.service';
import { FormControl } from '@angular/forms';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import * as L from 'leaflet'
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

  locationForm = new FormControl()
  locations :any[] = []
  hotels :any[] = []

  stars : any[] = []
  buy: boolean = false
  openMap: boolean = false
  map : L.Map
  marker : L.Marker[] = []
  constructor(private hotelService: HotelService, private locationService: LocationService) {
    this.location = this.hotelService.location
    this.fromDate = this.hotelService.fromDate
    this.toDate = this.hotelService.toDate
    this.locations = this.locationService.getLocation()
    this.hotels = hotelService.hotels
  }


  filterValidation(index){
    return true
  }

  ngOnInit(): void {
    console.log(this.hotelService.location )
  }

  toggleOverlay(event){
    if(event.target.id === "" && this.isHidden === false)
      this.isHidden = !this.isHidden;
    this.isHidden = !this.isHidden;
    this.outputHidden.emit(this.outputHidden)
    console.log(this.isHidden)
  }

  setBuy(event){
    this.buy = !this.buy
  }

  setOpenMap(){
    this.openMap = !this.openMap
    if(this.openMap){
      this.map = L.map('map', {
        center: [106.8223, -6.1818],
        zoom: 13
      })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.hotels.forEach(element => {
        console.log(element)
        L.marker([element.hotelLat, element.hotelLng]).addTo(this.map)
        .bindPopup(element.name)
        .openPopup();
      })
    }
  }
}
