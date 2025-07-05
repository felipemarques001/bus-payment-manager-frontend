import { CurrencyPipe } from '@angular/common';
import { PaymentSummary } from '../../models/payment-summary.interface';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-summary-card',
  imports: [CurrencyPipe],
  templateUrl: './payment-summary-card.component.html',
  styleUrl: './payment-summary-card.component.scss'
})
export class PaymentSummaryCardComponent {
  private readonly router = inject(Router);

  @Input({ required: true }) paymentSummary: PaymentSummary | null = null;

  protected openPaymentDetails(): void {
    this.router.navigate(['/payments', this.paymentSummary?.id]);
  }
}
