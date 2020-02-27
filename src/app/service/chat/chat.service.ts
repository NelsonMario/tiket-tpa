import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client'
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket: any;
  readonly uri: string = 'ws://localhost:1002';

  constructor() {
    this.socket = io(this.uri);
  }

  public listen(eventName: string) {
    return new Observable((subscriber) => {
      console.log("HIYAHIYA")
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  public emit(eventName: string, data: any) {
    console.log("kekirim")
    this.socket.emit(eventName, data);
  }
}
