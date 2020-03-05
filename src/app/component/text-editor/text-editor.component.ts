import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { QueryValueType } from '@angular/compiler/src/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {

  title = new FormControl()
  thumbnail = new FormControl()
  output = document.getElementById('output');
  buttons = document.getElementsByClassName('tool--btn');
  id: any
  blog$ : Subscription

  constructor(private graphql: graphqlService, private route: ActivatedRoute) { }

  user: any

  ngOnInit(): void {
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
  }

  submit(){
    var user = JSON.parse(localStorage.getItem('currentUser'))
    let value = document.getElementById("output").innerHTML
    this.blog$ = this.graphql.insertBlog(parseInt(user[0].id), this.title.value, value, "", this.thumbnail.value, 0).subscribe(async query => {
      console.log(query.data)
      if(query.data.title == null){
        alert("Failed")
      }else
        alert('Success Publish Blog')
    })
  }

  update(){
    var user = JSON.parse(localStorage.getItem('currentUser'))
    let value = document.getElementById("output").innerHTML
    this.blog$ = this.graphql.updateBlog(this.id, this.title.value, value, this.thumbnail.value).subscribe(async query => {
      alert('Success Update Blog')
      await
      window.location.reload()
    })
  }
}
