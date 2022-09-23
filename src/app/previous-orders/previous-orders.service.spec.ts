import { TestBed } from '@angular/core/testing';

import { PreviousOrdersService } from "./previous-orders.service";

describe('PreviousOrdersService', () => {
  let service: PreviousOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviousOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


