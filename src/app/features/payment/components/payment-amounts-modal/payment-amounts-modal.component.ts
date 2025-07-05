import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../services/payment.service';
import { FinancialHelpRequest } from '../../models/financial-help-request.interface';
import { PaymentAmountsRequest } from '../../models/payment-amounts-request.interface';
import { PaymentAmountsResponse } from '../../models/payment-amounts-response.interface';
import { of, catchError, Observable } from 'rxjs';
import {
  Input,
  inject,
  OnInit,
  Output,
  Component,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-payment-amounts-modal',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './payment-amounts-modal.component.html',
  styleUrl: './payment-amounts-modal.component.scss'
})
export class PaymentAmountsModalComponent implements OnInit {
  @Input({ required: true }) totalAmount: string = '';
  @Input({ required: true }) studentsQuantity: number = 0;
  @Input({ required: true }) financialHelps: FinancialHelpRequest[] = [];

  @Output() private readonly closeModalEmitter = new EventEmitter<void>();

  private readonly toastrService = inject(ToastrService);
  private readonly paymentService = inject(PaymentService);

  protected paymentAmounts$ = new Observable<PaymentAmountsResponse>;

  ngOnInit(): void {
    this.calculatePaymentAmounts();
  }

  protected emitCloseModal(): void {
    this.closeModalEmitter.emit();
  }

  private calculatePaymentAmounts(): void {
    const requestBody: PaymentAmountsRequest = {
      totalAmount: this.totalAmount,
      financialHelps: this.financialHelps,
      studentsQuantity: this.studentsQuantity,
    };

    this.paymentAmounts$ = this.paymentService.calculateAmounts(requestBody)
      .pipe(
        catchError((errorMessage: string) => {
          this.handleCalculationErrors(errorMessage);
          return of();
        })
      );
  }

  private handleCalculationErrors(errorMessage: string): void {
    this.toastrService.error(errorMessage, '', { progressBar: true });
    this.emitCloseModal();
  }
}
