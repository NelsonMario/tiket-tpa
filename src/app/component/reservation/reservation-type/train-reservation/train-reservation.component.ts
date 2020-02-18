import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Station } from 'src/app/models/station';
import { RailroadService } from 'src/app/service/railroad/railroad.service';
import { StationService } from 'src/app/service/station/station.service';

@Component({
  selector: 'app-train-reservation',
  templateUrl: './train-reservation.component.html',
  styleUrls: ['./train-reservation.component.scss']
})
export class TrainReservationComponent implements OnInit {

  @Input() way: boolean = true;
  stations: Station[] = [];
  station$: Subscription;
  railroad$: Subscription
  fromStation = new FormControl('', [Validators.required]);
  toStation = new FormControl('', [Validators.required]);
  formattedDeparture = new FormControl('', [Validators.required]);
  formattedArrival = new FormControl('', [Validators.required]);

  constructor(private graphqlService: graphqlService, private router: Router, private stationService: StationService, private railroadService: RailroadService) { }

  searchRailroad(){
    if(this.formattedArrival.value ==  null)
    this.formattedArrival.setValue("")

    this.railroad$ = this.graphqlService.getRailroadBySchedule(this.fromStation.value.city, this.toStation.value.city, this.formattedDeparture.value, this.formattedArrival.value).subscribe(async query=>{
          this.railroadService.railroad = query.data.railroadsBySchedule
          await
          console.log(query.data.railroadsBySchedule)
          console.log(this.fromStation.value)
          console.log(this.toStation.value)
          this.railroadService.from = this.fromStation.value.city
          this.railroadService.to = this.toStation.value.city
          this.router.navigate(["/train"])
      })
  }

  ngOnInit() {
    this.station$ = this.graphqlService.getAllStation().subscribe(async query=>{
      this.stationService.station = query.data.distinctStation;
      this.stations = this.stationService.getStation()
    })
  }
  ngOnDestroy(): void {
    if(this.railroadService.railroad.length != 0 && this.railroadService.railroad.length != 3){
      this.railroad$.unsubscribe()
    }
    this.station$.unsubscribe()
  }
}
