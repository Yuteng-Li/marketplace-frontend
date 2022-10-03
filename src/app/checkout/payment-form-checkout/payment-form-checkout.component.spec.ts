import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFormCheckoutComponent } from './payment-form-checkout.component';

describe('PaymentFormCheckoutComponent', () => {
  let component: PaymentFormCheckoutComponent;
  let fixture: ComponentFixture<PaymentFormCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentFormCheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentFormCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
