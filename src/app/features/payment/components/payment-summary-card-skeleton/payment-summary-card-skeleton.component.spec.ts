import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSummaryCardSkeletonComponent } from './payment-summary-card-skeleton.component';

describe('PaymentSummaryCardSkeletonComponent', () => {
  let component: PaymentSummaryCardSkeletonComponent;
  let fixture: ComponentFixture<PaymentSummaryCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentSummaryCardSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentSummaryCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
