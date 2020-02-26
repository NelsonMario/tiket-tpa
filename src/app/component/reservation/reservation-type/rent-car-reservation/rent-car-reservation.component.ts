import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/service/location/location.service';
import { CarService } from 'src/app/service/car/car.service';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-car-reservation',
  templateUrl: './rent-car-reservation.component.html',
  styleUrls: ['./rent-car-reservation.component.scss']
})
export class RentCarReservationComponent implements OnInit {

  cars : any[] = []
  car$ : Subscription
  isSearch : boolean = false
  vendors : any[] = []
  locations : any[] = []
  location$ : Subscription
  fromSchedule : string = ""
  toSchedule : string = ""
  location = new FormControl('', [Validators.required]);
  formattedStart = new FormControl('', [Validators.required]);
  formattedEnd = new FormControl('', [Validators.required]);


  constructor(private graphql: graphqlService, private locationService : LocationService, private carService :CarService, private router: Router) { }

  ngOnInit() {
    this.location$ = this.graphql.getAllLocation().subscribe(async query => {
      this.locationService.location = query.data.location
      await
      console.log(query.data.city)
      this.locations = this.locationService.getLocation()
    })
  }

  searchCar(){
    this.carService.fromDate = this.formattedStart.value
    this.carService.toDate = this.formattedEnd.value
    this.carService.location = this.location.value.city
    this.car$ = this.graphql.getCarByLocation(this.carService.location).subscribe(async query => {
        this.cars = query.data.carByLocation
        await
        console.log(query.data.carByLocation)
        this.carService.cars = this.cars
        this.router.navigate(['/car']);

        for(let i=0 ; i<this.cars.length ; i++){
          var vendorCar : any[] = this.cars[i].vendorCar
          console.log(vendorCar)
          for(let j=0 ; j<vendorCar.length ; j++){
            var vendorLocation : any[] = vendorCar[j].vendor.vendorLocation
            for(let k=0 ; k<vendorLocation.length ; k++){
              if(vendorLocation[k].location.city == this.carService.location){
                this.vendors.push(vendorCar[j].vendor.name)
              }
            }
          }
        }
        this.carService.vendors = this.vendors.filter((vendorsTemp, i, arr) => arr.findIndex(a=>a==vendorsTemp)==i)

      })

      this.isSearch= true
  }


    ngOnDestroy(): void {
      this.location$.unsubscribe();
      if(this.isSearch)
        this.car$.unsubscribe();
    }
}
