import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-payment-data-card',
  imports: [CurrencyPipe],
  templateUrl: './payment-data-card.component.html',
  styleUrl: './payment-data-card.component.scss'
})
export class PaymentDataCardComponent {
  @Input() callCurrencyPipe: boolean = false;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string;
}
