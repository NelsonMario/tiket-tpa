import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  reservationType: number = 1;

  constructor() { }

  ngOnInit() {
  }

  getReservationType(event){
    this.reservationType = event;
  }

}
