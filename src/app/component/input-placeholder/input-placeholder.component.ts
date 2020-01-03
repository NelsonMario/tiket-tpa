import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-placeholder',
  templateUrl: './input-placeholder.component.html',
  styleUrls: ['./input-placeholder.component.scss']
})
export class InputPlaceholderComponent implements OnInit {

  @Input('') desc: string;
  @Input('') width: number;
  
  constructor() { }

  ngOnInit() {
  }

}
