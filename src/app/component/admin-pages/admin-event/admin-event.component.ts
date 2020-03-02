import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['./admin-event.component.scss']
})
export class AdminEventComponent implements OnInit {

  event$: Subscription;
  events: any[] = [];
  cookieValue: string;
  login: boolean;
  user : any
  dataCount: any
  tempCount: any
  pollingData: any;
  inputEvent = new FormControl()
  inputPrice = new FormControl()

  realEvent: any[]=[]
  pageCount: any[] =[]
  loaded = true
  constructor(private grahpqlService: graphqlService, private router: Router, private http: HttpClient, private _snackBar: MatSnackBar, private route: Router) {
    if(localStorage.getItem("currentUser") == null)
      route.navigate([''])
    else{
      if(JSON.parse(localStorage.getItem("currentUser"))[0].email != "admin@admin.com")
        route.navigate([''])
    }
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'))

      if (this.user == null) {
          this.login = false;
      } else {
          this.login = true;
      }


      this.event$ = this.grahpqlService.getAllEvent().subscribe(async query => {
          this.realEvent = query.data.events;
          await
          this.pushToPagination()
          console.log(this.realEvent['length'])
          this.tempCount = this.realEvent.length
          this.loaded = false
        }
      );

      this.pollingData = Observable.interval(5000).switchMap(() => this.http.get('http://localhost:8080/?query=%7B%0A%09events%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%7D%0A%7D')).map((data) => JSON.stringify(data['data']['events']))
        .subscribe((data) => {
          let eventsData = JSON.parse(data)
          this.dataCount = eventsData['length']
          console.log(this.dataCount + " " + this.tempCount)
          if(this.tempCount != this.dataCount){
            alert("New event Has Publish")
            this.tempCount = this.dataCount
            return this.tempCount,  window.location.reload()
          }
        });
    }

    count(n) {
        return new Array(n);
    }

    goToDetail(id) {
        this.router.navigate(['event', id]);
    }

    goToUpdate(id) {
      this.router.navigate(['event-editor', id]);
  }

  deleteData(id){
    this.grahpqlService.removeEvent(id).subscribe(async query => {
      await this._snackBar.open("delete successfully", "close", {
        duration: 2000,
      })
    })
  }

  deleteDataClick(id){
    if (confirm("Do you want to delete ?")) {
      this.deleteData(id)
    }
  }

  pushToPagination() {
    for (let i = 0; i < this.realEvent.length; i++) {
      if(i < 5) this.events.push(this.realEvent[i])
      if(i % 5 == 0) this.pageCount.push(1 + (i/5))
    }
    console.log(this.pageCount)
  }

  changePage(currPage) {
    this.events = []
    for (let i = currPage * 5; i < (currPage+1) * 5 && i < this.realEvent.length; i++) {
      this.events.push(this.realEvent[i])
      }
    }
}
