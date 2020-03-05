import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  hotelOrder$: Subscription
  hotelOrders: any[] = []
  hotel$: Subscription
  hotels: any[] = []
  user: any[] = JSON.parse(localStorage.getItem('currentUser'))
  constructor(private graphql: graphqlService) { }

  filter: any[] = [
    {name: "Last Month", active: false},
    {name: "Last Year", active: false},
  ]

  ngOnInit(): void {
    console.log(this.user[0].id)
    this.hotelOrder$ = this.graphql.getHotelOrder(this.user[0].id).subscribe(async query=> {
      this.hotelOrders = query.data.order
      await
      console.log(this.hotelOrders)
    })
    this.hotel$ = this.graphql.getAllHotel().subscribe(async query=>{
      this.hotels = query.data.hotels
      await
      console.log(this.hotels)
    })
  }


  filterValidation(index){
    if(!this.dateValidation(index))
      return false
    return true
  }

  dateValidation(index){
    var unchecked: Boolean = true;

    for(let i = 0 ; i < this.filter.length ; i++){
      if(this.filter[i].active){
        unchecked = false;
        break;
      }
    }

    if(unchecked)return true;


    var date = this.hotelOrders[index].checkIn

    for(let i=0 ; i<this.filter.length ; i++){
      var element = this.filter[i];
      if(element.active){
        if(element.name === "Last Month" && ((new Date().getMonth() + 1) - 1) == (new Date(date).getMonth() + 1))
          return true;
        else if(element.name === "Last Year" && ((new Date().getFullYear()) - 1) == (new Date(date).getFullYear()))
          return true;
      }
    }
    return false;
  }

  monthSort(){
    this.hotelOrders.sort(function(a, b){return (new Date(a.checkIn).getMonth() + 1) -(new Date(b.checkIn).getMonth() + 1)})
  }

  reset(){
    for(let i = 0 ; i<this.filter.length; i++){
      this.filter[i].active = false
    }
  }
}
