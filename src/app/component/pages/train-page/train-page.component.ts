import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Filter } from 'src/app/models/filter';
import { Station } from 'src/app/models/station';
import { Railroad } from 'src/app/models/railroad';
import { FormControl, Validators } from '@angular/forms';
import { RailroadService } from 'src/app/service/railroad/railroad.service';
import { StationService } from 'src/app/service/station/station.service';
import { Subscription, Observable } from 'rxjs';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-train-page',
  templateUrl: './train-page.component.html',
  styleUrls: ['./train-page.component.scss']
})
export class TrainPageComponent implements OnInit {

  departures: Filter[] = [
    {name: "00:00 - 06:00", active: false,startTime: 0, endTime: 6},
    {name: "06:00 - 12:00", active: false,startTime: 6, endTime: 12},
    {name: "12:00 - 18:00", active: false,startTime: 12, endTime: 18},
    {name: "18:00 - 24:00", active: false,startTime: 18, endTime: 24}
  ]
  class: any[] = [
    {name: "Ekonomi", active: false},
    {name: "Bisnis", active: false},
    {name: "Eksekutif", active: false},
  ]

  trainTemp : any[] = []
  trains: any[] = []
  railroads: Railroad[] = []
  stations: Station[] = []
  fromStation = new FormControl('', [Validators.required]);
  toStation = new FormControl('', [Validators.required]);
  fromTrain = new FormControl('', [Validators.required]);
  toTrain = new FormControl('', [Validators.required]);
  from : string
  to : string
  isHidden: boolean = true
  buy : boolean = false
  @Output() outputHidden = new EventEmitter;


  railroad$ : Subscription
  tempRailroad : any
  tempCount : any
  pollingData:any
  dataCount:any
  constructor(private railroadService: RailroadService, private stationService: StationService, private graphqlService:graphqlService, private http: HttpClient) {
    this.railroads = railroadService.railroad
    this.from = railroadService.from
    this.to = railroadService.to
    this.railroads.forEach(elements => {
      this.trains.push(elements.train.name)
    })

    this.trainTemp = this.trains.filter((trainName, i, arr) => arr.findIndex(a=>a==trainName)==i)
    this.trains = []
    this.trainTemp.forEach(element => {
      this.trains.push({
        name: element,
        checked: false
      })
    })

    this.railroad$ = this.graphqlService.getAllRailroad().subscribe(async query => {
      this.tempRailroad = query.data.railroads;
      await
      console.log(this.tempRailroad['length'])
      this.tempCount = this.tempRailroad.length
    }
    );

    this.pollingData = Observable.interval(5000).switchMap(() => this.http.get('http://localhost:8080/api/success?query=%7B%0A%09railroads%7B%0A%20%20%20%20id%0A%20%20%7D%0A%7D')).map((data) => JSON.stringify(data['data']['railroads']))
      .subscribe((data) => {
        let railroadData = JSON.parse(data)
        this.dataCount = railroadData['length']
        console.log(this.dataCount + " " + this.tempCount)
        if(this.tempCount != this.dataCount){
          alert("New Railroad Has Publish")
          this.tempCount = this.dataCount
          return this.tempCount
        }
      });

      console.log(this.railroads)
  }

  ngOnInit() {
    this.stations = this.stationService.station
  }

  filterValidation(index){
    if(!this.departureTimeValidation(index))
      //if return true than dont show
      return false
    else if(!this.classValidation(index))
      //if return true than dont show
      return false
    return true
  }

  departureTimeValidation(index){
    var unchecked: Boolean = true;

    for(let i = 0 ; i < this.departures.length ; i++){
      if(this.departures[i].active){
        unchecked = false;
        break;
      }
    }

    if(unchecked)return true;


    var departureFlight = new Date(this.railroads[index].departure.toString()).getUTCHours()

    for(let i=0 ; i<this.departures.length ; i++){
      var element = this.departures[i];
      if(element.active && departureFlight >= element.startTime && departureFlight <= element.endTime){
        return true;
      }
    }
    return false;
  }


  classValidation(index){
    var unchecked: Boolean = true;

    for(let i = 0 ; i < this.class.length ; i++){
      if(this.class[i].active){
        unchecked = false;
        break;
      }
    }

    if(unchecked)return true;


    var classRoute = this.railroads[index].class.toString()

    for(let i=0 ; i<this.class.length ; i++){
      var element = this.class[i];
      if(element.active && classRoute === element.name){
        return true;
      }
    }
    return false;
  }

  trainValidation(index){
    var unchecked: Boolean = true;

    for(let i = 0 ; i < this.trains.length ; i++){
      if(this.trains[i].active){
        unchecked = false;
        break;
      }
    }

    if(unchecked)return true;


    var train = this.railroads[index].train.name

    for(let i=0 ; i<this.trains.length ; i++){
      var element = this.trains[i];
      if(element.active && train === element.name){
        return true;
      }
    }
    return false;
  }

  setBuy(){
    this.buy = !this.buy
    console.log(this.buy)
  }

  toggleOverlay(event){
    if(event.target.id === "" && this.isHidden === false)
      this.isHidden = !this.isHidden;
    this.isHidden = !this.isHidden;
    this.outputHidden.emit(this.isHidden)
  }

  priceSort(){
    this.railroads.sort(function(a, b){return a.price - b.price})
  }

  durationSort(){
    this.railroads.sort(function(a, b){return parseInt(a.duration) -  parseInt(b.duration)})
  }

  classSort (){
    this.railroads.sort(function(a, b){
      return  a.class.localeCompare(b.class)
    })
  }

  typeSort(){
    this.railroads.sort(function(a, b){
      return a.train.name.localeCompare(b.train.name)
    })
  }
}
