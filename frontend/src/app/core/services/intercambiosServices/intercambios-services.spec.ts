import { TestBed } from '@angular/core/testing';

import { IntercambiosServices } from './intercambios-services';

describe('IntercambiosServices', () => {
  let service: IntercambiosServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntercambiosServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
