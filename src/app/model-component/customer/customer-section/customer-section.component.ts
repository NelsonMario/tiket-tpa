import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-section',
  templateUrl: './customer-section.component.html',
  styleUrls: ['./customer-section.component.scss']
})
export class CustomerSectionComponent implements OnInit {

  @Output() outputHidden = new EventEmitter;
  isHidden:boolean = true;

  nearestHotels: any[] = []
  nearestHotel$: Subscription

  constructor(private  graphql: graphqlService) { }

  ngOnInit() {
    this.nearestHotel$ = this.graphql.getNearestHotelByLocation("Jakarta").subscribe(async query =>{
      this.nearestHotels = query.data.nearestHotels
    })
  }

  toggleOverlay(event){
    if(event.target.id === "" && this.isHidden === false)
      this.isHidden = !this.isHidden;
    this.isHidden = !this.isHidden;
    this.outputHidden.emit(this.outputHidden)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.nearestHotel$.unsubscribe()
  }

}
