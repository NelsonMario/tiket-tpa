import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-placeholder',
  templateUrl: './input-placeholder.component.html',
  styleUrls: ['./input-placeholder.component.scss']
})
export class InputPlaceholderComponent implements OnInit {

  @Input() desc: string;
  @Input() width: number;
  @Output() returnedString = new EventEmitter;
  @Input() inputtedString: string = "";

  constructor() { }

  ngOnInit() {
  }

  emitString(){
    this.returnedString.emit(this.inputtedString)
  }

}
