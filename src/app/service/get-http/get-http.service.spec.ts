import { TestBed } from '@angular/core/testing';

import { GetHttpService } from './get-http.service';

describe('GetHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetHttpService = TestBed.get(GetHttpService);
    expect(service).toBeTruthy();
  });
});
