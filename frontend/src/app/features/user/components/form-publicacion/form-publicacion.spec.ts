import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPublicacion } from './form-publicacion';

describe('FormPublicacion', () => {
  let component: FormPublicacion;
  let fixture: ComponentFixture<FormPublicacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPublicacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPublicacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
