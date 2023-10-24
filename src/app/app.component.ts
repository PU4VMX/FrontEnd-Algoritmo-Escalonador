import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './service/web-socket.service';
import { ComunicacaoService } from './service/comunicacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TP_SO';

  constructor(
    private webSocket: WebSocketService,
    private comunicacao: ComunicacaoService
  ) {}

  ngOnInit() {
    if(!this.webSocket.isConnected) {
      this.connect();
    }
  }

  ngAfterViewInit() {
    this.comunicacao.escalonadorEmmiter.subscribe((escalonador: string) => {
      if(!this.webSocket.isConnected) {
        this.connect();
      }
    })

    this.comunicacao.finishEmmiter.subscribe((finish: boolean) => {
      if(this.webSocket.isConnected) {
        this.webSocket.disconnect();
      }
    })
  }

  connect() {
    this.webSocket
      .connect()
      .then(() => {
        this.webSocket.subscribeToTopic('processo').subscribe((message) => {
          let mensagem = JSON.parse(message);
          if (mensagem == "Finish") {
            this.comunicacao.finishEmmiter.emit(true);
          } else {
            this.comunicacao.websocketEmmiter.emit(mensagem);
          }
        });
      })
      .catch((error) => {
        this.connect();
      });
  }
}
