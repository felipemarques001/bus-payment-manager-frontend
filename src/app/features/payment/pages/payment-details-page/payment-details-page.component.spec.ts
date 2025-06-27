import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailsPageComponent } from './payment-details-page.component';

describe('PaymentDetailsPageComponent', () => {
  let component: PaymentDetailsPageComponent;
  let fixture: ComponentFixture<PaymentDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
