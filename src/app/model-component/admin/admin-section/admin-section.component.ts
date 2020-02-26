import { Component, OnInit } from '@angular/core';
import * as L  from 'leaflet';


@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.scss']
})
export class AdminSectionComponent implements OnInit {

  map : L.map

  constructor() {

  }
  ngOnInit(): void {
    this.map = L.map('map', {
      center: [106.8223, -6.1818],
      zoom: 13
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([106.8223, -6.1818]).addTo(this.map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
  }


}
