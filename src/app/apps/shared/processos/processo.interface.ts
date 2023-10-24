export interface Processo {
  finalizado: any;
  iniciado: boolean;
  pid: number;
  nome: string;
  estado: string;
  prioridade?: number;
  tempo_chegada: number;
  tempo_execucao: number;
  tempo_restante: number;
  tempo_espera: number;
  tempo_executado: number;
  instante_inicial: number;
  instante_final: number;
}
