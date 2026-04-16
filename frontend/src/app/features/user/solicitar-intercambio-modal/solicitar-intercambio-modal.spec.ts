import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarIntercambioModalComponent } from './solicitar-intercambio-modal'; // Cambiado de 'SolicitarIntercambioModal' a 'SolicitarIntercambioModalComponent'

describe('SolicitarIntercambioModal', () => {
  let component: SolicitarIntercambioModalComponent;
  let fixture: ComponentFixture<SolicitarIntercambioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarIntercambioModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarIntercambioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
