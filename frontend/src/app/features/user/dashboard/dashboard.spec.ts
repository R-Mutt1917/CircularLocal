import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboard } from './dashboard'; // Cambiado de 'Dashboard' a 'UserDashboard'

describe('Dashboard', () => {
  let component: UserDashboard;
  let fixture: ComponentFixture<UserDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
