import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: Client;
  private topicSubject: Subject<Message> = new Subject<Message>();
  public isConnected: boolean = false;

  constructor() {
    this.stompClient = new Client({
      brokerURL: `${environment.WS}/ws`, // URL do seu servidor Spring Boot WebSocket
      debug: (str) => console.log(str),
    });
  }

  connect(): Promise<void> {
    if (this.isConnected) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      this.stompClient.activate();
      this.stompClient.onConnect = () => {
        this.isConnected = true;
        resolve();
      };
      this.stompClient.onStompError = (error) => {
        reject(error);
      };
    });
  }

  disconnect() {
    this.stompClient.deactivate();
    this.isConnected = false;
  }

  subscribeToTopic(topic: string): Observable<string> {
    if (!this.isConnected) {
      return new Observable(); // Return an empty observable if not connected.
    }

    const messageSubject = new Subject<string>();

    this.stompClient.subscribe(`/topic/${topic}`, (message) => {
      const messageJson = message.body;
      messageSubject.next(messageJson);
    });

    return messageSubject.asObservable();
  }

  send(topic: string, payload: any) {
    if (!this.isConnected) {
      return; // Return if not connected.
    }

    this.stompClient.publish({
      destination: `/app/${topic}`,
      body: JSON.stringify(payload),
    });
  }
}
