import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAmountsModalComponent } from './payment-amounts-modal.component';

describe('PaymentAmountsModalComponent', () => {
  let component: PaymentAmountsModalComponent;
  let fixture: ComponentFixture<PaymentAmountsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentAmountsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentAmountsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
