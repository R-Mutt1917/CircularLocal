import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionDetallada } from './publicacion-detallada';

describe('PublicacionDetallada', () => {
  let component: PublicacionDetallada;
  let fixture: ComponentFixture<PublicacionDetallada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicacionDetallada]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacionDetallada);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
