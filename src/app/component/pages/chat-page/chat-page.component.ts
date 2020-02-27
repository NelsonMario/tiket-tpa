import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat/chat.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  constructor() { }

  private chatService:ChatService= new ChatService();

  ngOnInit(): void {
    this.chatService.listen('chat').subscribe(
      m=>{
        console.log(m);
      }
    )
  }

  send():void{
    this.chatService.emit("chat","Test");
  }

}
