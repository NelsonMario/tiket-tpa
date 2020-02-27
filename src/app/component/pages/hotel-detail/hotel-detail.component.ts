import { Component, OnInit } from '@angular/core';
import { Slider } from 'src/app/models/slider';
import { Subscription } from 'rxjs';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import * as L from 'leaflet'
@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {

  isCarouselShown = false
  images: Slider[] = [];
  image$: Subscription;
  index = 0;
  hotel: any


  map : L.Map
  marker : L.Marker[] = []

  displayHotel: any
  openMap : boolean = false
  nearestHotel$ : Subscription
  nearestHotel : any

  constructor(private graphqlService: graphqlService, private hotelService: HotelService) {
    this.hotel = this.hotelService.hotel
  }

  ngOnInit() {
    this.image$ = this.graphqlService.getAllSlide().subscribe(async query =>{
      this.images =query.data.sliders;
    })
    this.nearestHotel$ = this.graphqlService.getNearestHotelByLocation(this.hotel.location.city).subscribe(async query =>{
      this.nearestHotel = query.data.nearestHotels
      await
      console.log(this.nearestHotel)
    })
  }


  ngOnDestroy(): void {
    this.image$.unsubscribe();
    this.nearestHotel$.unsubscribe();
  }

  setShown(){
    this.isCarouselShown = !this.isCarouselShown
  }

  setOpenMap(){
    this.openMap = !this.openMap


    if(this.openMap){
      this.map = L.map('map', {
        center: [106.8223, -6.1818],
        zoom: 13
      })
      this.map.setView([this.hotel.hotelLat, this.hotel.hotelLng], 13);

      var markersLayer = L.featureGroup().addTo(this.map).on("click", this.groupClick)
      var marker
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.nearestHotel.forEach(element => {
        marker = L.marker([element.hotelLat, element.hotelLng]).addTo(markersLayer)
        .bindPopup(element.name);
        marker.hotel = element
      })

    }
  }

  groupClick(event) {
    this.displayHotel = event.layer.hotel
    alert("Hotel Name : " + this.displayHotel.name + "\n" + "Hotel Rating : " +this.displayHotel.rating + "Stars")
  }

}

