import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFilter } from './form-filter';

describe('FormFilter', () => {
  let component: FormFilter;
  let fixture: ComponentFixture<FormFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
