import { Component, OnInit } from '@angular/core';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { async } from '@angular/core/testing';
import * as L from 'leaflet'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-event-detail-pages',
  templateUrl: './event-detail-pages.component.html',
  styleUrls: ['./event-detail-pages.component.scss']
})
export class EventDetailPagesComponent implements OnInit {

  event$: Subscription
  event: any[] = []
  id: any
  map : any

  formattedStart = new FormControl()
  fromDate = ""
  user = JSON.parse(localStorage.getItem('currentUser'))

  constructor(private graphql: graphqlService, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id')
    this.event$ = this.graphql.getEventById(this.id).subscribe(async query => {
      this.event = query.data.eventById
      await
      console.log(this.event)
      this.map = L.map('map', {
        center: [this.event[0].eventLat, this.event[0].eventLng],
        zoom: 13
      })

      this.map.setView([this.event[0].eventLat, this.event[0].eventLng], 13);

      var markersLayer = L.featureGroup().addTo(this.map).on("click", this.groupClick)
      var marker

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      marker = L.marker([this.event[0].eventLat, this.event[0].eventLng]).addTo(markersLayer)
      .bindPopup(this.event[0].name);
      marker.hotel = event[0]
    })
  }

  ngOnInit(): void {

  }

  groupClick(){
    console.log("")
  }

  orderNow(){
    this.router.navigate(['event-order', this.id])
  }
}
