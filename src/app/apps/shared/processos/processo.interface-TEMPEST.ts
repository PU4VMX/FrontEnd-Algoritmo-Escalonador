export interface Processo {
  pid: number;
  nome: string;
  estado: string;
  tempo_execucao: number;
  tempo_chegada: number;
  tempo_espera: number;
  prioridade: number;
  tempo_restante: number;
}
