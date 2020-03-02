import { Component, OnInit } from '@angular/core';
import { Slider } from 'src/app/models/slider';
import { Subscription } from 'rxjs';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import * as L from 'leaflet'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail-hotel',
  templateUrl: './detail-hotel.component.html',
  styleUrls: ['./detail-hotel.component.scss']
})
export class DetailHotelComponent implements OnInit {

  isCarouselShown = false
  images: Slider[] = [];
  image$: Subscription;
  index = 0;
  hotel: any[] = []
  hotel$: Subscription


  map : L.Map
  marker : L.Marker[] = []

  displayHotel: any
  openMap : boolean = false
  nearestHotel$ : Subscription
  nearestHotel : any
  id: any

  reviewDisplay : any[] = []
  review : any[] = []
  pageCount : any[] = []
  constructor(private graphqlService: graphqlService, private hotelService: HotelService, private route: ActivatedRoute) {
  }

  ngOnInit() {


    for(let i = 0 ; i < 30 ; i++)
    this.review.push({
      reviewer: "Dummy" + i,
      comment: "Mantul" + i
    })
    this.pushToPagination()
    this.id = this.route.snapshot.paramMap.get('id')

    this.hotel$ = this.graphqlService.hotelById(parseInt(this.id)).subscribe(async query =>{
      this.hotel = query.data.hotel
      await
      console.log(this.hotel[0])
      this.nearestHotel$ = this.graphqlService.getNearestHotelByLocation(this.hotel[0].location.city).subscribe(async query =>{
        this.nearestHotel = query.data.nearestHotels
        await
        console.log(this.nearestHotel)
      })
    })

    this.image$ = this.graphqlService.getAllSlide().subscribe(async query =>{
      this.images =query.data.sliders;
    })

  }


  ngOnDestroy(): void {
    this.image$.unsubscribe();
    this.hotel$.unsubscribe();
    this.nearestHotel$.unsubscribe();
  }

  setOpenMap(){
    this.openMap = !this.openMap


    if(this.openMap){
      this.map = L.map('map', {
        center: [106.8223, -6.1818],
        zoom: 13
      })
      this.map.setView([this.hotel[0].hotelLat, this.hotel[0].hotelLng], 13);

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

  email() {
    var url = location.href
    location.href = 'mailto:?subject=Tiket.com&body=links:http://127.0.0.1:4200' + url;
  }

  copy(){
    var url = location.href
    navigator.clipboard.writeText(url)
  }

  facebook(){
    var url = location.href
    window.open('http://www.facebook.com/sharer.php?u=http://127.0.0.1:4200/search-hotel'+this.id ,'facebookShare', 'width=626,height=436');
  }
  setShown(){
    this.isCarouselShown = !this.isCarouselShown
  }

  pushToPagination() {
    for (let i = 0; i < this.review.length; i++) {
      if(i < 5) this.reviewDisplay.push(this.review[i])
      if(i % 5 == 0) this.pageCount.push(1 + (i/5))
    }
  }

  changePage(currPage) {
    this.reviewDisplay = []
    for (let i = currPage * 5; i < (currPage+1) * 5 && i < this.review.length; i++) {
      this.reviewDisplay.push(this.review[i])
      }
    }
}
