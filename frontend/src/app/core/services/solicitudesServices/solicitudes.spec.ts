import { TestBed } from '@angular/core/testing';

import { SolicitudesService } from './solicitudes'; // Cambiado de 'Solicitudes' a 'SolicitudesService'

describe('Solicitudes', () => {
  let service: SolicitudesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
