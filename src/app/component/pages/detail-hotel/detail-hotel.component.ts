import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Slider } from 'src/app/models/slider';
import { Subscription } from 'rxjs';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import * as L from 'leaflet'
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
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
  formattedEnd = new FormControl
  formattedStart = new FormControl
  isHidden: boolean = true
  toDate: string
  fromDate:string
  @Output('')outputHidden = new EventEmitter

  types: any[] = [
    {name: "Pay at Hotel", active: false},
    {name: "Pembatalan Gratis", active: false},
  ]

  categories: any[] = [
    {name: "Lokasi", active: false},
    {name: "Kebersihan", active: false},
    {name: "Kamar", active: false},
    {name: "Pelayanan", active: false}
  ]

  lokasi : any = {score: 0, count: 0}
  kebersihan: any = {score: 0, count: 0}
  kamar: any = {score: 0, count: 0}
  pelayanan: any = {score: 0, count: 0}

  reviewRating: any[] = [
    {number: 1, active: false},
    {number: 2, active: false},
    {number: 3, active: false},
    {number: 4, active: false},
    {number: 5, active: false}
  ]

  facilities: any[] = []
  tempFacility: any[] = []

  map : L.Map
  marker : L.Marker[] = []

  displayHotel: any
  openMap : boolean = false
  nearestHotel$ : Subscription
  nearestHotel : any
  id: any

  reviewDisplay : any[] = []
  review : any[] = []
  review$ : Subscription
  pageCount : any[] = []
  constructor(private graphqlService: graphqlService, private hotelService: HotelService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.review$ = this.graphqlService.getReviewByHotelId(this.id).subscribe(async query => {
      this.review = query.data.review
      await
      this.pushToPagination()
      this.summary()
      console.log("ASd")
      console.log(this.kebersihan)
    })

    this.hotel$ = this.graphqlService.hotelById(parseInt(this.id)).subscribe(async query =>{
      this.hotel = query.data.hotel
      await
      console.log(query.data.hotel)
      console.log(this.hotel[0])
      for(let i = 0 ; i < this.hotel[0].hotelRoom.length ; i++){
        let hotelRoom = this.hotel[0].hotelRoom[i]
        console.log(hotelRoom)
        for(let j = 0 ; j < hotelRoom.room.roomFacility.length ; j++){
          this.tempFacility.push(hotelRoom.room.roomFacility[j].facility.name)
        }
      }
      this.tempFacility = this.tempFacility.filter((facilityTempName, i, arr) => arr.findIndex(a=>a==facilityTempName)==i)

      this.tempFacility.forEach(element => {
        this.facilities.push({
          name: element,
          active: false
        })
      });
      console.log(this.facilities)
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

  toggleOverlay(event){
    if(event.target.id === "" && this.isHidden === false)
      this.isHidden = !this.isHidden;
    this.isHidden = !this.isHidden;
    this.outputHidden.emit(this.outputHidden)
    console.log(this.isHidden)
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

    navigateCheckout(room){
      this.router.navigate(['checkout', this.id, room])
    }

    filterValidation(index){
      if(!this.ratingValidation(index))
        return false
      else if(!this.categoryValidation(index))
        return false
      return true
    }


    roomValidation(index){
      if(!this.typeValidation(index))
        return false
      else if(!this.facilityValidation(index))
        return false
      return true
    }

    categoryValidation(index){
      var unchecked: Boolean = true;

      for(let i = 0 ; i < this.categories.length ; i++){
        if(this.categories[i].active){
          unchecked = false;
          break;
        }
      }

      if(unchecked)return true;


      var category = this.reviewDisplay[index].category

      for(let i=0 ; i<this.categories.length ; i++){
        var element = this.categories[i];
        if(element.active && category === element.name){
          return true;
        }
      }
      return false;
    }

    typeValidation(index){
      var unchecked: Boolean = true;

      for(let i = 0 ; i < this.types.length ; i++){
        if(this.types[i].active){
          unchecked = false;
          break;
        }
      }

      if(unchecked)return true;


      var type = this.hotel[0].hotelRoom[index].room.type
      for(let i=0 ; i<this.types.length ; i++){
        var element = this.types[i];
        if(element.active && type === element.name){
          return true;
        }
      }
      return false;
    }

    facilityValidation(index){
      var unchecked: Boolean = true;

      for(let i = 0 ; i < this.facilities.length ; i++){
        if(this.facilities[i].active){
          unchecked = false;
          break;
        }
      }

      if(unchecked)return true;


      var roomFacility = this.hotel[0].hotelRoom[index].room.roomFacility
      for(let i=0 ; i<roomFacility.length ; i++){
        for(let j=0 ; j<this.facilities.length ; j++)
          var element = this.facilities[j].name
          if(roomFacility[i].facility.name == element){
            return true
          }
      }
      return false;
    }

    ratingValidation(index){
      var unchecked: Boolean = true;

      for(let i = 0 ; i < this.reviewRating.length ; i++){
        if(this.reviewRating[i].active){
          unchecked = false;
          break;
        }
      }

      if(unchecked)return true;


      var review = this.reviewDisplay[index].review

      for(let i=0 ; i<this.reviewRating.length ; i++){
        var element = this.reviewRating[i];
        if(element.active && review == element.number){
          return true;
        }
      }
      return false;
    }

    ratingSort(){
      this.reviewDisplay.sort(function(a, b){return a.review - b.review})
    }
    summary(){
      this.review.forEach(element => {
        if(element.category == "Lokasi"){
          this.lokasi.score += parseInt(element.review)
          this.lokasi.count++
        }
        else if(element.category == "Kebersihan"){
          this.kebersihan.score += parseInt(element.review)
          this.kebersihan.count++
          console.log("ASD")
        }
        else if(element.category == "Kamar"){
          this.kamar.score += parseInt(element.review)
          this.kamar.count++
        }
        else{
          this.pelayanan.score += parseInt(element.review)
          this.pelayanan.count++
        }

      })
    }
}
