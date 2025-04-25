import { TestBed } from '@angular/core/testing';

import { GelocationService } from './gelocation.service';

describe('GelocationService', () => {
  let service: GelocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GelocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
