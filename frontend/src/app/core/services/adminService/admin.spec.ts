import { TestBed } from '@angular/core/testing';

import { adminService } from './admin';

describe('Admin', () => {
  let service: adminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(adminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
