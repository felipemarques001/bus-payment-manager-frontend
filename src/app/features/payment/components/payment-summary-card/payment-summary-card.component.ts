import { CurrencyPipe } from '@angular/common';
import { PaymentSummary } from '../../models/payment-summary.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-payment-summary-card',
  imports: [CurrencyPipe],
  templateUrl: './payment-summary-card.component.html',
  styleUrl: './payment-summary-card.component.scss'
})
export class PaymentSummaryCardComponent {
  @Input({ required: true }) paymentSummary: PaymentSummary | null = null;
}
