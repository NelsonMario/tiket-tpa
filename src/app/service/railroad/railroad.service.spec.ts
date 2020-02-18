import { TestBed } from '@angular/core/testing';

import { RailroadService } from './railroad.service';

describe('RailroadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RailroadService = TestBed.get(RailroadService);
    expect(service).toBeTruthy();
  });
});
