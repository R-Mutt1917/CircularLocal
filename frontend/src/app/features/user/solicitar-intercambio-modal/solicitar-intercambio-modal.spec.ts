import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarIntercambioModal } from './solicitar-intercambio-modal';

describe('SolicitarIntercambioModal', () => {
  let component: SolicitarIntercambioModal;
  let fixture: ComponentFixture<SolicitarIntercambioModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarIntercambioModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarIntercambioModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
