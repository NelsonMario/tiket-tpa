import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/service/location/location.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  name = new FormControl()
  location = new FormControl()
  output = document.getElementById('output');
  buttons = document.getElementsByClassName('tool--btn');
  id: any
  event$ : Subscription
  events : any[] = []
  inputEventDetailName = new FormControl()
  inputPrice = new FormControl()
  inputEvent = new FormControl()
  inputCategory = new FormControl()
  inputStartDate = new FormControl()
  inputEndDate = new FormControl()
  formattedStartDate = new FormControl()
  formattedEndDate = new FormControl()



  fromSchedule: string = ""
  toSchedule: string = ""


  user: any
  locations : any[] = []

  location$ : Subscription
  pollingData : any
  tempCount : any
  dataCount : any

  constructor(private graphql: graphqlService, private route: ActivatedRoute, private http: HttpClient) {
  }


  ngOnInit(): void {


    this.location$ = this.graphql.getAllLocation().subscribe(async query=>{
      this.locations = query.data.location
      await
      console.log(this.locations)
    })

    this.id = this.route.snapshot.paramMap.get('id')

    this.user = JSON.parse(localStorage.getItem("currentUser"))

    console.log(this.buttons)
    for(let i = 0 ; i < this.buttons.length ; i++){
      this.buttons[i].addEventListener('click', () => {
        let cmd = this.buttons[i]['dataset']['command']
        if(cmd === 'createlink') {
          let url = prompt("Enter the link here: ", "http:\/\/");
          document.execCommand(cmd, false, url);
        } else {
          document.execCommand(cmd, false, null);
        }
      })
    }
    this.event$ = this.graphql.getAllEvent().subscribe(async query=>{
      this.events = query.data.events
      await
      console.log(this.events)
      this.tempCount = this.events.length
    })

    this.pollingData = Observable.interval(5000).switchMap(() => this.http.get('http://localhost:8080/?query=%7B%0A%09events%7B%0A%20%20%20%20id%0A%20%20%7D%0A%7D')).map((data) => JSON.stringify(data['data']['events']))
      .subscribe((data) => {
        let eventData = JSON.parse(data)
        this.dataCount = eventData['length']
        console.log(this.dataCount + " " + this.tempCount)
        if(this.tempCount != this.dataCount){
          alert("New Event Has Publish")
          this.tempCount = this.dataCount
          return this.tempCount,  window.location.reload()
        }
      });
    }

  submit(){
    var user = JSON.parse(localStorage.getItem('currentUser'))
    let value = document.getElementById("output").innerHTML

    this.event$ = this.graphql.insertEvent(this.name.value, this.location.value.id, this.formattedStartDate.value+"T"+this.inputStartDate.value+"Z", this.formattedEndDate.value+"T"+this.inputEndDate.value+"Z", this.location.value.lat, this.location.value.lng, this.inputCategory.value, value).subscribe(async query => {
      if(query.data.name == null){
        alert("Failed")
      }else
        alert('Success Publish Event')
    })
    if(this.inputEvent.value != null){
      this.graphql.insertEventDetail(this.inputEvent.value.id, this.inputEventDetailName, this.inputPrice.value).subscribe(async query => {

      })
    }

  }

  update(){
    var user = JSON.parse(localStorage.getItem('currentUser'))
    let value = document.getElementById("output").innerHTML
    this.event$ = this.graphql.updateEvent(this.id, this.name.value, this.location.value.id, this.formattedStartDate.value+"T"+this.inputStartDate.value+"Z", this.formattedEndDate.value+"T"+this.inputEndDate.value+"Z").subscribe(async query => {
      alert('Success Update Blog')
      await
      window.location.reload()
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.location$.unsubscribe()
  }
}
