import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { Slider } from 'src/app/models/slider';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  images: Slider[] = [];
  image$: Subscription;
  index = 0;
  constructor(private graphqlService: graphqlService) {
  }

  ngOnInit() {
    this.image$ = this.graphqlService.getAllSlide().subscribe(async query =>{
      this.images =query.data.sliders;
    })
  }


  ngOnDestroy(): void {
    this.image$.unsubscribe();
  }
}
