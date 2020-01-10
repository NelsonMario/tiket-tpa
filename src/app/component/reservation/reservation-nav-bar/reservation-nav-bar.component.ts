import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReservationType } from './reservation-type';
@Component({
  selector: 'app-reservation-nav-bar',
  templateUrl: './reservation-nav-bar.component.html',
  styleUrls: ['./reservation-nav-bar.component.scss']
})
export class ReservationNavBarComponent implements OnInit {

  reservationTypes: ReservationType[] = [];
  @Output() reservationTypeOutput = new EventEmitter;

  constructor() {
    this.reservationTypes.push(new ReservationType(1, 'airplane.png', 'Pesawat'));
    this.reservationTypes.push(new ReservationType(2, 'hotel.png', 'Hotel'));
    this.reservationTypes.push(new ReservationType(3, 'train.png', 'Kereta Api'));
    this.reservationTypes.push(new ReservationType(4, 'car.png', 'Sewa Mobil'));
    this.reservationTypes.push(new ReservationType(5, 'entertainment.png', 'Entertainment'));
  }

  ngOnInit() {
  }

  click(event){
    this.reservationTypeOutput.emit(event.path[1].id);
  }

}
