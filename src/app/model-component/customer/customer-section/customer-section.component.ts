import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer-section',
  templateUrl: './customer-section.component.html',
  styleUrls: ['./customer-section.component.scss']
})
export class CustomerSectionComponent implements OnInit {

  @Output() outputHidden = new EventEmitter;
  isHidden:boolean = true;

  constructor() { }

  ngOnInit() {
  }
  toggleOverlay(event){
    if(event.target.id === "" && this.isHidden === false)
      this.isHidden = !this.isHidden;
    this.isHidden = !this.isHidden;
    this.outputHidden.emit(this.outputHidden)
  }

}
