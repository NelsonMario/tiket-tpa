import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat/chat.service';
import { FormControl } from '@angular/forms';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  chats : any [] = []
  chatForm = new FormControl()
  fileForm = new FormControl()

  fArchived : boolean = false
  fStarred : boolean = false
  constructor(private route: Router) { }

  private chatService:ChatService= new ChatService();

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('currentUser')) == null)
      this.route.navigate([''])
    this.chatService.listen('chat').subscribe(
      m=>{
        this.chats.push(JSON.parse(m.toString()))
      }
    )
  }

  send():void{
    this.chatService.emit("chat", JSON.stringify({ message: this.chatForm.value,
                                                    starred: false,
                                                    archived: false,
                                                    type: "message"}));
  }
  sendImage():void{
    const fileName = this.fileForm.value.split('\\')

    this.chatService.emit("chat", JSON.stringify({ message: "..\\..\\assets\\airline\\"+fileName[fileName.length - 1],
                                                    starred: false,
                                                    archived: false,
                                                    type: "image"}));
  }

  setStarred(i){
    this.chats[i].starred = !this.chats[i].starred
  }
  setArchived(i){
    this.chats[i].archived = !this.chats[i].archived
  }


  filterDefault(){
    this.fArchived = this.fStarred = false
  }

  filterStarred(){
    this.fStarred = true
  }

  filterArchived(){
    this.fArchived = true
  }
}
