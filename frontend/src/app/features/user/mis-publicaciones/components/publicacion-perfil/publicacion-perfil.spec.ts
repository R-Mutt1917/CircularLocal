import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionPerfil } from './publicacion-perfil';

describe('PublicacionPerfil', () => {
  let component: PublicacionPerfil;
  let fixture: ComponentFixture<PublicacionPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicacionPerfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacionPerfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
