import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Processo } from 'src/app/apps/shared/processos/processo.interface';
import { ComunicacaoService } from 'src/app/service/comunicacao.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-round-robin',
  templateUrl: './round-robin.component.html',
  styleUrls: ['./round-robin.component.css']
})
export class RoundRobinComponent {

  processos = this.comunicacao.processos;
  quantum = this.comunicacao.quantum;

  constructor(private comunicacao: ComunicacaoService) { }

}
