import { EventEmitter, Injectable, Output } from '@angular/core';
import { Processo } from '../apps/shared/processos/processo.interface';

@Injectable({
  providedIn: 'root',
})
export class ComunicacaoService {
  processos: Processo[] = [];
  series: any = [];
  quantum: number = 2;
  sleep: number = 1000;
  contador: number = 0;
  listar: boolean = false;

  @Output() quantumEmitter = new EventEmitter<Number>();
  @Output() clearEmmiter = new EventEmitter<boolean>();

  @Output() processosEmmiter = new EventEmitter<Processo[]>();
  @Output() updateChartEmmiter = new EventEmitter<Processo>();
  @Output() websocketEmmiter = new EventEmitter<any>();
  @Output() addProcess = new EventEmitter<Processo>();
  @Output() escalonadorEmmiter = new EventEmitter<string>();
  @Output() pararEmmiter = new EventEmitter<boolean>();
  @Output() killEmmiter = new EventEmitter<Processo>();
  @Output() finishEmmiter = new EventEmitter<Boolean>();

  chartOptions: any = {
    series: [],
    chart: {
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
      height: 450,
      type: 'rangeBar', // Isso define o tipo de gráfico como Gantt
    },
    dataLabels: {
      enabled: false, // Se desejar, você pode habilitar rótulos de dados
    },
    legend: {
      show: true,
      position: 'top',
    },
    xaxis: {
      type: 'category',
      labels: {
        show: true,
        formatter: function (val: any) {
          return val + 's';
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%',
      },
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8', '#304ffe', '#ff1744', '#00bfa5', '#ff3d00', '#00b8d4', '#ff6d00', '#00c853']
  };
}
