import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFormSuccessCheckoutComponent } from './payment-form-success-checkout.component';

describe('PaymentFormSuccessCheckoutComponent', () => {
  let component: PaymentFormSuccessCheckoutComponent;
  let fixture: ComponentFixture<PaymentFormSuccessCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentFormSuccessCheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentFormSuccessCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
