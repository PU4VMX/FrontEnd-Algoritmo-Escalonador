import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoundRobinComponent } from './algoritmos/preemptivos/round-robin/round-robin.component';
import { ShotestJobComponent } from './algoritmos/nao_preemptivos/shotest-job/shotest-job.component';
import { ShotestRemaningComponent } from './algoritmos/preemptivos/shotest-remaning/shotest-remaning.component';
import { EscalonamentoComponent } from './algoritmos/nao_preemptivos/escalonamento/escalonamento.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rr', component: RoundRobinComponent },
  { path: 'sjf', component: ShotestJobComponent},
  { path: 'srtf', component: ShotestRemaningComponent},
  { path: 'prio', component: EscalonamentoComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
