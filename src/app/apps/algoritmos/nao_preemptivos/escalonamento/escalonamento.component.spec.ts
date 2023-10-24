import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalonamentoComponent } from './escalonamento.component';

describe('EscalonamentoComponent', () => {
  let component: EscalonamentoComponent;
  let fixture: ComponentFixture<EscalonamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscalonamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscalonamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
