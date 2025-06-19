import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSummaryCardComponent } from './payment-summary-card.component';

describe('PaymentSummaryCardComponent', () => {
  let component: PaymentSummaryCardComponent;
  let fixture: ComponentFixture<PaymentSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentSummaryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
