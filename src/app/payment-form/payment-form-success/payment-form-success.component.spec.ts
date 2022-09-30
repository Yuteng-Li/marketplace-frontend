import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFormSuccessComponent } from './payment-form-success.component';

describe('PaymentFormSuccessComponent', () => {
  let component: PaymentFormSuccessComponent;
  let fixture: ComponentFixture<PaymentFormSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentFormSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentFormSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
