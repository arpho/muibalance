/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { SellersService } from './suppliers.service';

describe('Service: Suppliers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellersService]
    });
  });

  it('should ...', inject([SellersService], (service: SellersService) => {
    expect(service).toBeTruthy();
  }));
});
