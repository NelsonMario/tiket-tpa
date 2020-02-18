import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Filter } from 'src/app/models/filter';
import { Station } from 'src/app/models/station';
import { Railroad } from 'src/app/models/railroad';
import { FormControl, Validators } from '@angular/forms';
import { RailroadService } from 'src/app/service/railroad/railroad.service';
import { StationService } from 'src/app/service/station/station.service';

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

  railroads: Railroad[] = []
  stations: Station[] = []
  fromStation = new FormControl('', [Validators.required]);
  toStation = new FormControl('', [Validators.required]);
  from : string
  to : string
  isHidden: boolean = true
  buy : boolean = false
  @Output() outputHidden = new EventEmitter;

  constructor(private railroadService: RailroadService, private stationService: StationService) {
    this.railroads = railroadService.railroad
    this.from = railroadService.from
    this.to = railroadService.to
    console.table(this.from, this.to)
  }

  ngOnInit() {
    this.stations = this.stationService.station
  }

  filterValidation(index){
    if(!this.departureTimeValidation(index))
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
}
