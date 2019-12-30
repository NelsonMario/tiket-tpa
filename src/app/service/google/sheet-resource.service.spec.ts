import { TestBed } from '@angular/core/testing';

import { SheetResourceService } from './sheet-resource.service';

describe('SheetResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SheetResourceService = TestBed.get(SheetResourceService);
    expect(service).toBeTruthy();
  });
});
