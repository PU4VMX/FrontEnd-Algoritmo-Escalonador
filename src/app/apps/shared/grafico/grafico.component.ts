import { Component, OnInit } from '@angular/core';
import {
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
  ApexXAxis,
} from 'ng-apexcharts';
import { Processo } from '../processos/processo.interface';
import { ComunicacaoService } from 'src/app/service/comunicacao.service';
import { ApiRequestService } from 'src/app/service/api-request.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css'],
})
export class GraficoComponent implements OnInit {
  processos = this.comunicacao.processos;
  quantum = this.comunicacao.quantum;
  series = this.comunicacao.series;
  contador = this.comunicacao.contador;
  chartOptions = this.comunicacao.chartOptions;
  enable: boolean = false;

  constructor(
    private comunicacao: ComunicacaoService,
    private apiRequest: ApiRequestService
  ) {}

  ngOnInit(): void {
    this.setEnable();
  }

  setEnable() {
    let path = window.location.pathname.split('/')[1];
    if (path == 'prio') {
      this.enable = true;
    } else {
      this.enable = false;
    }
  }

  //subscrever o evento de atualização de quantum
  ngAfterViewInit() {
    this.comunicacao.quantumEmitter.subscribe((quantum: number) => {
      this.quantum = quantum;
      alert(`Quantum atualizado para ${quantum}`);
    });

    this.comunicacao.processosEmmiter.subscribe((processos: Processo[]) => {
      this.processos = processos;
      this.comunicacao.processos = processos;
      this.startChart();
    });

    this.comunicacao.clearEmmiter.subscribe(() => {
      this.chartOptions.series = [];
      this.comunicacao.series = [];
      this.comunicacao.contador = 0;
      this.comunicacao.processos = [];
      this.processos = [];
    });

    this.comunicacao.websocketEmmiter.subscribe((processo: Processo) => {
      this.updateProcessos(processo);
    });

    this.comunicacao.finishEmmiter.subscribe((finish: boolean) => {
      if (finish) {
        alert('Escalonamento finalizado!');
      }
    });
  }

  updateProcessos(processo: Processo) {
    let diferencaX = 0
    let diferencaY = 0
    this.processos.find((p: Processo) => {
      diferencaX = p.tempo_execucao - processo.tempo_restante;
      diferencaY = p.tempo_espera - processo.tempo_espera;
      if (p.nome == processo.nome) {
        p.estado = processo.estado;
        p.tempo_espera = processo.tempo_espera;
        p.tempo_restante = processo.tempo_restante;
      }
    });
    this.updateChart(processo, diferencaX, diferencaY);
  }

  updateChart(processo:any, diferencaX:number, diferencaY:number) {
    let index = this.series.findIndex((s: any) => s.name == processo.nome);
    let data = this.series[index].data;
    data.push({
      x: processo.estado,
      y: [
        processo.tempo_espera,
        diferencaX ,
      ],
    });
    this.series[index].data = data;
    this.chartOptions.series = [...this.series];
  }

  startChart() {
    this.series = [];
    this.processos.forEach((processo: Processo) => {
      this.series.push({
        name: processo.nome,
        data: [
          {
            x: processo.estado,
            y: [
              processo.tempo_chegada,
              processo.tempo_execucao + processo.tempo_chegada,
            ],
          },
        ],
      });
    });
    this.chartOptions.series = [...this.series];
  }

  escalonar() {
    let path = window.location.pathname.split('/')[1];
    this.comunicacao.escalonadorEmmiter.emit(path);
  }

  parar() {
    this.comunicacao.pararEmmiter.emit();
  }

  killProcess(processo: Processo) {
    let confirm = window.confirm(`Deseja matar o processo ${processo.nome}?`);
    if (confirm) {
      this.comunicacao.killEmmiter.emit(processo);
    } else {
      return;
    }
  }
}

export type ChartOptions = {
  series: any[];
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  colors: string[];
};
