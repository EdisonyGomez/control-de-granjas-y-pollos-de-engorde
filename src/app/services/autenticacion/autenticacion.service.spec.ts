import { TestBed } from '@angular/core/testing';

import { AutenticacionService } from './autenticacion.service';

describe('AutenticacionServiceService', () => {
  let service: AutenticacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
