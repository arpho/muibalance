import { TestBed } from '@angular/core/testing';

import { MyDbService } from './my-db.service';

describe('MyDbService', () => {
  let service: MyDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
