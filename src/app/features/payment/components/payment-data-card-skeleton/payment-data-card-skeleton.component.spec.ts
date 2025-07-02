import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDataCardSkeletonComponent } from './payment-data-card-skeleton.component';

describe('PaymentDataCardSkeletonComponent', () => {
  let component: PaymentDataCardSkeletonComponent;
  let fixture: ComponentFixture<PaymentDataCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDataCardSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentDataCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
