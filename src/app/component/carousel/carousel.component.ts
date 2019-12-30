import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  images: string[] = [];
  maxPicture: number = 6;

  constructor() {
    for (let i = 1; i <= this.maxPicture; i++) {
      this.images.push(i + '.jpg');
    }
  }

  ngOnInit() {
  }

}
