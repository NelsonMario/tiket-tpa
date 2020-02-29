import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocationService } from 'src/app/service/location/location.service';
import { CarService } from 'src/app/service/car/car.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutCarService } from 'src/app/service/checkout-car/checkout-car.service';

@Component({
  selector: 'app-car-pages',
  templateUrl: './car-pages.component.html',
  styleUrls: ['./car-pages.component.scss']
})
export class CarPagesComponent implements OnInit {

  locations : any[] =[]
  vendors : any[] = []
  locationForm = new FormControl('', Validators.required)
  location : string
  fromDate : string
  toDate : string
  isHidden : boolean = true
  minimumPrice = new FormControl();
  maximumPrice = new FormControl();
  formattedStart = new FormControl();
  formattedEnd = new FormControl();
  cars : any[] = []
  @Output('')outputHidden = new EventEmitter
  buy = false;
  orderedCar = 0

  brands: any[] = []
  brandsTemp: any[] = []

  models: any[] = []
  modelsTemp: any[] = []

  passengers: any[] = [
    {name: "< 5 Penumpang", active: false, minPassenger: 0, maxPassenger: 4},
    {name: "5 - 6 Penumpang", active: false, minPassenger: 5, maxPassenger: 6},
    {name: "> 6 Penumpang", active: false, minPassenger: 7, maxPassenger: 32}
  ]

  constructor(private locationService : LocationService, private carService : CarService, private router : Router, private checkout: CheckoutCarService) {
  }

  ngOnInit(): void {
    this.locations = this.locationService.getLocation()
    this.location = this.carService.location
    this.fromDate = this.carService.fromDate
    this.toDate = this.carService.toDate
    this.cars = this.carService.cars
    this.cars.forEach(elements => {
      this.models.push(elements.model)
    })
    this.modelsTemp = this.models.filter((modelTemp, i, arr) => arr.findIndex(a=>a==modelTemp)==i)
    this.models = []
    this.modelsTemp.forEach(element => {
      this.models.push({
        model: element,
        checked: false
      })
    })

    this.cars.forEach(elements => {
      this.brands.push(elements.name)
    })

    this.brandsTemp = this.brands.filter((brandTemp, i, arr) => arr.findIndex(a=>a==brandTemp)==i)
    this.brands = []
    this.brandsTemp.forEach(element => {
      this.brands.push({
        brand: element,
        checked: false
      })
    })

    this.vendors = this.carService.getVendor()
  }

  filterValidation(index){
    if(!this.priceValidation(index))
      //if return true than dont show
      return false
    if(!this.passengerValidation(index))
      //if return true than dont show
      return false
    else if(!this.brandsValidation(index))
      //if return true than dont show
      return false
    else if(!this.modelValidation(index))
      //if return true than dont show
      return false
    return true
  }

  passengerValidation(index){
    var unchecked: Boolean = true;

    for(let i = 0 ; i < this.passengers.length ; i++){
      if(this.passengers[i].active){
        unchecked = false;
        break;
      }
    }

    if(unchecked)return true;


    var passengers = this.cars[index].passanger

    for(let i=0 ; i<this.passengers.length ; i++){
      var element = this.passengers[i];
      if(element.active && passengers >= element.minPassenger && passengers <= element.maxPassenger){
        return true;
      }
    }
    return false;
  }

  brandsValidation(index){
    var unchecked: Boolean = true;

    for(let i = 0 ; i < this.brands.length ; i++){
      if(this.brands[i].active){
        unchecked = false;
        break;
      }
    }

    if(unchecked)return true;


    var brand = this.cars[index].name

    for(let i=0 ; i<this.brands.length ; i++){
      var element = this.brands[i];
      if(element.active && brand == element.brand){
        return true;
      }
    }
    return false;
  }

  modelValidation(index){
    var unchecked: Boolean = true;

    for(let i = 0 ; i < this.models.length ; i++){
      if(this.models[i].active){
        unchecked = false;
        break;
      }
    }

    if(unchecked)return true;


    var model = this.cars[index].model

    for(let i=0 ; i<this.models.length ; i++){
      var element = this.models[i];
      if(element.active && model == element.model){
        return true;
      }
    }
    return false;
  }

  priceValidation(index){
    var model = this.cars[index].price
    if(model >= this.minimumPrice.value && model <= this.maximumPrice.value)
      return true;
    return false
  }

  setBuy(event){
    this.buy = !this.buy
    this.orderedCar = event.path[2].id
  }

  navigateCheckout(){
    this.checkout.car = this.cars[this.orderedCar]
    this.router.navigate(['checkout'])
  }

  toggleOverlay(event){
    if(event.target.id === "" && this.isHidden === false)
      this.isHidden = !this.isHidden;
    this.isHidden = !this.isHidden;
    this.outputHidden.emit(this.outputHidden)
    console.log(this.isHidden)
  }

  cheapPriceSort(){
    this.cars.sort(function(a, b){return a.price - b.price})
  }

  expensivePriceSort(){
    this.cars.sort(function(a, b){return b.price - a.price})
  }
}
