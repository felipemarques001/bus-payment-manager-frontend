import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDataCardComponent } from './payment-data-card.component';

describe('PaymentDataCardComponent', () => {
  let component: PaymentDataCardComponent;
  let fixture: ComponentFixture<PaymentDataCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDataCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
