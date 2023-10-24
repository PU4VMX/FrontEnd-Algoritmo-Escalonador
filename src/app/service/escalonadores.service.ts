import { Injectable } from '@angular/core';
import { ComunicacaoService } from './comunicacao.service';
import { Processo } from '../apps/shared/processos/processo.interface';

@Injectable({
  providedIn: 'root'
})
export class EscalonadoresService {

  timerSleep = this.comunicacao.sleep;

  constructor(
    private comunicacao: ComunicacaoService
  ) { }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms * this.comunicacao.sleep));
  }

  async escalonadorSRTF() {
    let processos = this.comunicacao.processos;
    processos.sort((a, b) => a.tempoExecucao - b.tempoExecucao);

  }

  async escalonadorSJF() {
    let processos = this.comunicacao.processos;
    processos.sort((a, b) => a.tempoExecucao - b.tempoExecucao);

  }

  async escalonadorPrioridade() {
    let processos = this.comunicacao.processos;
    processos.sort((a, b) => a.prioridade! - b.prioridade!);
  }

  updateChart(processo: Processo) {
    this.comunicacao.updateChartEmmiter.emit(processo);
  }

  async escalonadorRoundRobin() {
    let processos = this.comunicacao.processos;
    let quantum = this.comunicacao.quantum;



    let interval = setInterval(async () => {
      if (processos.every((processo: Processo) => processo.finalizado)) {
        console.log('Todos os processos foram finalizados');
        clearInterval(interval);
      }
    }, 1000);


  }

}
