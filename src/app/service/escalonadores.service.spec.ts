import { TestBed } from '@angular/core/testing';

import { EscalonadoresService } from './escalonadores.service';

describe('EscalonadoresService', () => {
  let service: EscalonadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscalonadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
