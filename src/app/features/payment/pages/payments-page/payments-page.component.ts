import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { PaymentService } from '../../services/payment.service';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { PageResponse } from '../../../../shared/models/page-response.interface';
import { PaymentSummary } from '../../models/payment-summary.interface';
import { AsyncPipe } from '@angular/common';
import { PaymentSummaryCardComponent } from '../../components/payment-summary-card/payment-summary-card.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PaymentSummaryCardSkeletonComponent } from '../../components/payment-summary-card-skeleton/payment-summary-card-skeleton.component';
import { PageCounterComponent } from '../../../../shared/components/page-counter/page-counter.component';

@Component({
  selector: 'app-payments-page',
  imports: [
    AsyncPipe,
    ButtonComponent,
    PageHeaderComponent,
    PageCounterComponent,
    PaymentSummaryCardComponent,
    PaymentSummaryCardSkeletonComponent,
  ],
  templateUrl: './payments-page.component.html',
  styleUrl: './payments-page.component.scss'
})
export class PaymentsPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  private readonly paymentService = inject(PaymentService);

  protected readonly paymentSummariesCardSkeletonList = Array(30);
  
  protected isLoading: boolean = false;
  protected hasNextPage: boolean = false;
  protected pageNumber: number = 0;
  protected totalPayments: number = 0;
  protected paymentSummaries$ = new Observable<PaymentSummary[]>;

  ngOnInit(): void {
    this.getPayments();
  }

  goToPaymentCreationPage(): void {
    this.router.navigate(['/payments/create']);
  }

  getPayments(): void {
    this.isLoading = true;

    this.paymentSummaries$ = this.paymentService.getPaymentSummaries(this.pageNumber)
      .pipe(
        map((response: PageResponse<PaymentSummary>) => {
          this.pageNumber = response.pageNumber;
          this.hasNextPage = !response.last;
          this.totalPayments = response.totalElements;
          return response.content;
        }),

        catchError((errorMessage: string) => {
          this.toastrService.error(errorMessage);
          this.router.navigate(['/home']);
          return of();
        }),

        finalize(() => this.isLoading = false),
      );
  }

  getNextPayments(): void {
    if (!this.hasNextPage || this.isLoading) return;

    this.pageNumber += 1;
    this.getPayments();
  }

  getPreviousPayments(): void {
    if (this.isLoading) return;

    this.pageNumber -= 1;
    this.getPayments();
  }
}
