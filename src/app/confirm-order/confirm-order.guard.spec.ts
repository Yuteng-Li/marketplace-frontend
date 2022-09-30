import { TestBed } from '@angular/core/testing';

import { ConfirmOrderGuard } from './confirm-order.guard';

describe('ConfirmOrderGuard', () => {
  let guard: ConfirmOrderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfirmOrderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
