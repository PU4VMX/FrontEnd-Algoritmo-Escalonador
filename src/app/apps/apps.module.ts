import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { RoundRobinComponent } from './algoritmos/preemptivos/round-robin/round-robin.component';
import { ShotestRemaningComponent } from './algoritmos/preemptivos/shotest-remaning/shotest-remaning.component';
import { ShotestJobComponent } from './algoritmos/nao_preemptivos/shotest-job/shotest-job.component';
import { EscalonamentoComponent } from './algoritmos/nao_preemptivos/escalonamento/escalonamento.component';
import { LayoutModule } from '../layout/layout.module';
import { HomeComponent } from './home/home.component';
import { GraficoComponent } from './shared/grafico/grafico.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProcessosComponent } from './shared/processos/processos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimplebarAngularModule } from 'simplebar-angular';


@NgModule({
  declarations: [
    RoundRobinComponent,
    ShotestRemaningComponent,
    ShotestJobComponent,
    EscalonamentoComponent,
    HomeComponent,
    GraficoComponent,
    ProcessosComponent
  ],
  imports: [
    CommonModule,
    AppsRoutingModule,
    LayoutModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    SimplebarAngularModule,
  ]
})
export class AppsModule { }
