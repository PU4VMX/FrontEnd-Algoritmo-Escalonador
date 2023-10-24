import { Component, Input } from '@angular/core';
import { Processo } from './processo.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunicacaoService } from 'src/app/service/comunicacao.service';
import { WebSocketService } from 'src/app/service/web-socket.service';
import { ApiRequestService } from 'src/app/service/api-request.service';



@Component({
  selector: 'app-processos',
  templateUrl: './processos.component.html',
  styleUrls: ['./processos.component.css'],
})
export class ProcessosComponent {
  @Input() prioridade: boolean = false;

  processos = this.comunicacao.processos;
  quantum = this.comunicacao.quantum;
  sleep = this.comunicacao.sleep;
  processItem!: FormGroup;
  formSubmitted: boolean = false;

  enableQuantum: boolean = false;

  estados: string[] = ['Pronto', 'Executando', 'Em espera', 'Finalizado'];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private comunicacao: ComunicacaoService,
    private apiRequest: ApiRequestService,
    private webSocket: WebSocketService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.listar();
    this.setEnableQuantum();
  }

  setEnableQuantum() {
    let path = window.location.pathname.split('/')[1];
    if (path == 'rr') {
      this.enableQuantum = true;
    } else {
      this.enableQuantum = false;
    }
  }

  initForm() {
    this.processItem = this.fb.group({
      nome: [`P${this.processos.length + 1}`],
      estado: ['Pronto'],
      tempo_execucao: [0, Validators.required],
      tempo_chegada: [0, Validators.required],
      tempo_espera: [0, Validators.nullValidator],
      prioridade: [0, Validators.nullValidator],
      tempo_restante: [0, Validators.nullValidator],
    });
  }

  get formValues() {
    return this.processItem.controls;
  }

  ngAfterViewInit() {
    this.comunicacao.escalonadorEmmiter.subscribe((escalonador: string) => {
      this.escalonar(escalonador);
    });

    this.comunicacao.pararEmmiter.subscribe((parar: boolean) => {
      this.parar();
    });

    this.comunicacao.killEmmiter.subscribe((processo: Processo) => {
      this.kill(processo);
    });
  }

  escalonar(path: string) {
    this.apiRequest.post(`executar/run`, path).subscribe((res: any) => {
      console.log(res)
    });
  }

  connect() {
    this.webSocket
      .connect()
      .then(() => {
        this.webSocket.subscribeToTopic('processo').subscribe((message) => {
          this.comunicacao.websocketEmmiter.emit(message);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  kill(processo: Processo) {
    this.apiRequest.post(`processo/kill`, processo).subscribe((res: any) => {
      this.listar();
    });
  }

  parar() {
    this.apiRequest.get(`executar/stop`).subscribe((res: any) => {});
  }

  async listar() {
    this.apiRequest.get('processo/listar').subscribe((res: any) => {
      if (res.length > 0) {
        this.comunicacao.processosEmmiter.emit(res);
      }
    });
  }

  createProcessRandom() {
    this.apiRequest.post('processo/criarRandom', {}).subscribe((res: any) => {
      this.comunicacao.processosEmmiter.emit(res);
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.processItem.invalid) {
      return;
    }
    this.processItem.value.tempoRestante = this.processItem.value.tempoExecucao;
    this.apiRequest
      .post('processo/criar', this.processItem.value)
      .subscribe((res: any) => {
        this.listar();
        this.closeModal();
      });
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  closeModal() {
    this.modalService.dismissAll();
    this.formSubmitted = false;
    this.initForm();
  }

  clearProcess() {
    let confirmacao = confirm('Deseja realmente limpar a lista de processos?');
    if (confirmacao) {
      this.apiRequest.get('processo/limpar').subscribe((res: any) => {
        this.comunicacao.clearEmmiter.emit();
      });
    }
  }

  quantumChange() {
    this.apiRequest
      .post('processo/quantum', this.quantum)
      .subscribe((res: any) => {
        this.comunicacao.quantumEmitter.emit(this.quantum);
      });
  }
}
