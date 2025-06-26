import { ToastrService } from 'ngx-toastr';
import { TuitionService } from '../../services/tuition.service';
import { TuitionResponse } from '../../models/tuition-response.interface';
import { StudentResponse } from '../../../../shared/models/student-response.interface';
import { PhoneNumberPipe } from '../../../../shared/pipes/phone-number.pipe';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { TuitionPaidRequest } from '../../models/tuition-paid-request.interface';
import { catchError, finalize, of } from 'rxjs';
import { Component, inject, Input } from '@angular/core';
import { TuitionCardSkeletonComponent } from '../tuition-card-skeleton/tuition-card-skeleton.component';
import { PAYMENT_OPTIONS, TuitionPaymentType } from '../../constants/payment-options.constant';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-tuition-card',
  imports: [
    PhoneNumberPipe,
    SelectComponent,
    ButtonComponent,
    TuitionCardSkeletonComponent,
  ],
  templateUrl: './tuition-card.component.html',
  styleUrl: './tuition-card.component.scss',
  animations: [
    trigger('openClosePaymentDetails', [
      state('open', style({
        height: '*',
        opacity: 1,
        overflow: 'hidden'
      })),
      state('closed', style({
        height: 0,
        opacity: 0,
        overflow: 'hidden'
      })),
      transition('open <=> closed', animate('200ms ease-in')),
    ]),
  ],
})
export class TuitionCardComponent {
  @Input({ required: true }) tuition!: TuitionResponse;

  private readonly toastrService = inject(ToastrService);
  private readonly tuitionService = inject(TuitionService);

  private paymentOption: TuitionPaymentType = PAYMENT_OPTIONS[0].value;

  protected isLoading: boolean = false;
  protected isDetailsOpened: boolean = false;

  protected toggleIsDetailsOpened(): void {
    this.isDetailsOpened = !this.isDetailsOpened;
  }

  protected updatePaymentOption(index: number): void {
    this.paymentOption = PAYMENT_OPTIONS[index].value;
  }

  protected updateTuitionToPaid(): void {
    const request: TuitionPaidRequest = {
      paymentType: this.paymentOption,
    }

    this.isLoading = true;
    this.isDetailsOpened = false;
    this.tuitionService.updateTuitionToPaid(this.tuition.id, request)
      .pipe(
        catchError((errorMessage: string) => {
          this.toastrService.error(errorMessage);
          return of();
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe((response: TuitionResponse) => {
        this.toastrService.success('Mensalidade atualizada com sucesso');
        this.tuition = response;
      });
  }

  protected updateTuitionToNotPaid(): void {
    this.isLoading = true;
    this.isDetailsOpened = false;
    this.tuitionService.updateTuitionToNotPaid(this.tuition.id)
      .pipe(
        catchError((errorMessage: string) => {
          this.toastrService.error(errorMessage);
          return of();
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe((response: TuitionResponse) => {
        this.toastrService.success('Mensalidade atualizada com sucesso');
        this.tuition = response;
      });
  }

  get student(): StudentResponse {
    return this.tuition.student;
  }

  get paymentOptionsLabels(): string[] {
    return PAYMENT_OPTIONS.map((option) => option.label);
  }

  get paymentDate(): string {
    if (this.tuition.paidAt !== null) {
      const paymentDate = new Date(this.tuition.paidAt);
      const formatedPaymentDate = Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(paymentDate);

      return formatedPaymentDate.replace(',', ' às').concat('hr');
    }

    return 'Não há data de pagamento definida';
  }

  get paymentFormat(): string {
    if (this.tuition.paymentType !== null) {
      const paymentOption = PAYMENT_OPTIONS.filter((option) => option.value === this.tuition.paymentType);
      return paymentOption[0].label;
    }

    return 'Não formato de pagamento definido';
  }
}
