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

  @Output() quantumEmitter = new EventEmitter<Number>();
  @Output() clearEmmiter = new EventEmitter<boolean>();
  @Output() sleepEmmiter = new EventEmitter<number>();
  @Output() processosEmmiter = new EventEmitter<Processo[]>();
  @Output() updateChartEmmiter = new EventEmitter<Processo>();
  @Output() contadorEmmiter = new EventEmitter<number>();
  @Output() finishEmmiter = new EventEmitter<boolean>();
  @Output() websocketEmmiter = new EventEmitter<string>();
  @Output() escalonadorEmmiter = new EventEmitter<string>();
  @Output() listarEmmiter = new EventEmitter<boolean>();
  @Output() killEmmiter = new EventEmitter<Processo>();
  @Output() pararEmmiter = new EventEmitter<boolean>();
  @Output() 

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
    colors: ['#008FFB', '#00E396', '#CED4DC', '#FF4560', '#775DD0'],
  };
}
