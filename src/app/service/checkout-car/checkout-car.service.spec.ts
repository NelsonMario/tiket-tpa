import { TestBed } from '@angular/core/testing';

import { CheckoutCarService } from './checkout-car.service';

describe('CheckoutCarService', () => {
  let service: CheckoutCarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutCarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
