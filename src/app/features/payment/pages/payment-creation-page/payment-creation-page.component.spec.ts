import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCreationPageComponent } from './payment-creation-page.component';

describe('PaymentCreationPageComponent', () => {
  let component: PaymentCreationPageComponent;
  let fixture: ComponentFixture<PaymentCreationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentCreationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
