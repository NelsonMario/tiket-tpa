import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/service/location/location.service';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-reservation',
  templateUrl: './hotel-reservation.component.html',
  styleUrls: ['./hotel-reservation.component.scss']
})
export class HotelReservationComponent implements OnInit {

  location = new FormControl();
  formattedStart = new FormControl();
  formattedEnd = new FormControl();
  locations : any[] = []
  location$ : Subscription
  fromSchedule : string = ""
  toSchedule : string = ""
  hotel$: Subscription
  hotels: any[] = []
  night = new FormControl()
  person = new FormControl()
  constructor(private graphql: graphqlService, private locationService : LocationService, private hotelService: HotelService, private router: Router) { }

  ngOnInit() {
    this.location$ = this.graphql.getAllLocation().subscribe(async query => {
      this.locationService.location = query.data.location
      await
      console.log(query.data.city)
      this.locations = this.locationService.getLocation()
    })
  }

  searchHotel(){
    this.hotel$ = this.graphql.getHotelByLocation(this.location.value.city).subscribe(async query => {
      this.hotels = query.data.hotelByLocation
      await
      console.log(this.location.value.city)
      this.hotelService.hotels = this.hotels
      this.hotelService.location = this.location.value.city
      this.hotelService.fromDate = this.formattedStart.value
      this.hotelService.toDate = this.formattedEnd.value
      this.hotelService.night = this.night.value
      this.hotelService.person = this.person.value
      this.router.navigate(['search-hotel'])
    })

  }

  ngOnDestroy(): void {
    this.location$.unsubscribe();
    this.hotel$.unsubscribe();
  }
}
