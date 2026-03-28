import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirPublicacion } from './subir-publicacion';

describe('SubirPublicacion', () => {
  let component: SubirPublicacion;
  let fixture: ComponentFixture<SubirPublicacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirPublicacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirPublicacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
