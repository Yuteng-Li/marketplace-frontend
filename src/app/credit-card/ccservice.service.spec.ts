import { TestBed } from '@angular/core/testing';

import { CcserviceService } from './ccservice.service';

describe('CcserviceService', () => {
  let service: CcserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CcserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
