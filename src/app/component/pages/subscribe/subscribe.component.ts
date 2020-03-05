import { Component, OnInit } from '@angular/core';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {


  message = new FormControl()
  constructor(private graphql: graphqlService) { }

  ngOnInit(): void {
  }


  insertContent(){
    this.graphql.insertContent(this.message.value).subscribe(async query=>{
      alert("Notify Success")
    })
  }
}
