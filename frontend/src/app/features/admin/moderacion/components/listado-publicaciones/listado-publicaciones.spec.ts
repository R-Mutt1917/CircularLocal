import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPublicaciones } from './listado-publicaciones';

describe('ListadoPublicaciones', () => {
  let component: ListadoPublicaciones;
  let fixture: ComponentFixture<ListadoPublicaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoPublicaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPublicaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
