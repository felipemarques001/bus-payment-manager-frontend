import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TuitionService } from '../../services/tuition.service';
import { TuitionResponse } from '../../models/tuition-response.interface';
import { StudentResponse } from '../../../../shared/models/student-response.interface';
import { PhoneNumberPipe } from '../../../../shared/pipes/phone-number.pipe';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { TuitionStatus } from '../../enums/tuition-status.enum';
import { PaymentOptions } from '../../enums/payment-options.enum';
import { TuitionPaidRequest } from '../../models/tuition-paid-request.interface';
import { TuitionCardSkeletonComponent } from '../tuition-card-skeleton/tuition-card-skeleton.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

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
  @Output() protected readonly tuitionUpdateEmitter = new EventEmitter<void>();

  private readonly toastrService = inject(ToastrService);
  private readonly tuitionService = inject(TuitionService);
  private readonly paymentOptions = [
    { value: PaymentOptions.PIX, label: 'PIX' },
    { value: PaymentOptions.CARD, label: 'Cartão' },
    { value: PaymentOptions.BILLET, label: 'Boleto' },
    { value: PaymentOptions.CASH_PAYMENT, label: 'Espécie' },
  ] as const;
  private selectedPaymentOptionIndex: number = 0;

  protected readonly tuitionStatus = TuitionStatus;
  protected isLoading: boolean = false;
  protected isDetailsOpened: boolean = false;

  protected toggleIsDetailsOpened(): void {
    this.isDetailsOpened = !this.isDetailsOpened;
  }

  protected updatePaymentOption(index: number): void {
    this.selectedPaymentOptionIndex = index;
  }

  protected updateTuitionToPaid(): void {
    const request: TuitionPaidRequest = {
      paymentType: this.paymentOptions[this.selectedPaymentOptionIndex].value,
    }

    this.isLoading = true;
    this.isDetailsOpened = false;
    this.tuitionService.updateTuitionToPaid(this.tuition.id, request)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.toastrService.success('Mensalidade atualizada com sucesso');
          this.tuitionUpdateEmitter.emit();
        },
        error: (errorMessage: string) => {
          this.toastrService.error(errorMessage);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  protected updateTuitionToPending(): void {
    this.isLoading = true;
    this.isDetailsOpened = false;
    this.tuitionService.updateTuitionToPending(this.tuition.id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.toastrService.success('Mensalidade atualizada com sucesso');
          this.tuitionUpdateEmitter.emit();
        },
        error: (errorMessage: string) => {
          this.toastrService.error(errorMessage);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  get student(): StudentResponse {
    return this.tuition.student;
  }

  get paymentOptionsLabels(): string[] {
    return this.paymentOptions.map((option) => option.label);
  }

  get paymentDate(): string {
    if (this.tuition.status === TuitionStatus.PAID) {
      const paymentDate = new Date(this.tuition.paidAt!);
      const formatedPaymentDate = Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(paymentDate);

      return formatedPaymentDate.replace(',', ' -').concat('h');
    }

    return 'Não há data de pagamento definida';
  }

  get paymentFormat(): string {
    if (this.tuition.paymentType !== null) {
      const paymentOption = this.paymentOptions.filter(
        (option) => option.value === this.tuition.paymentType
      );

      return paymentOption[0].label;
    }

    return 'Não formato de pagamento definido';
  }
}
