import { Component, OnInit } from '@angular/core';
import { ReservationType } from './reservation-type';
@Component({
  selector: 'app-reservation-nav-bar',
  templateUrl: './reservation-nav-bar.component.html',
  styleUrls: ['./reservation-nav-bar.component.scss']
})
export class ReservationNavBarComponent implements OnInit {

  reservationTypes: ReservationType[] = [];
  constructor() {
    this.reservationTypes.push(new ReservationType('airplane.png', 'Pesawat'));
    this.reservationTypes.push(new ReservationType('hotel.png', 'Hotel'));
    this.reservationTypes.push(new ReservationType('train.png', 'Kereta Api'));
    this.reservationTypes.push(new ReservationType('car.png', 'Sewa Mobil'));
    this.reservationTypes.push(new ReservationType('entertainment.png', 'Entertainment'));
  }

  ngOnInit() {
  }

}
