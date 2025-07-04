import { take } from "rxjs";
import { CurrencyPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { PageHeaderComponent } from "../../../../shared/components/page-header/page-header.component";
import { ActivatedRoute, Router } from "@angular/router";
import { PaymentService } from "../../services/payment.service";
import { PaymentResponse } from "../../models/payment-response.interface";
import { TuitionCardComponent } from "../../components/tuition-card/tuition-card.component";
import { PageFooterComponent } from "../../../../shared/components/page-footer/page-footer.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { ToastrService } from "ngx-toastr";
import { TuitionResponse } from "../../models/tuition-response.interface";
import { TuitionService } from "../../services/tuition.service";
import { TuitionStatus } from "../../enums/tuition-status.enum";
import { TuitionCardSkeletonComponent } from "../../components/tuition-card-skeleton/tuition-card-skeleton.component";
import { PaymentDataCardComponent } from "../../components/payment-data-card/payment-data-card.component";
import { PaymentDataCardSkeletonComponent } from "../../components/payment-data-card-skeleton/payment-data-card-skeleton.component";
import { FilterRadioOptions } from "../../../../shared/models/filter-radio-options.interface";
import { FilterRadioComponent } from "../../../../shared/components/radio-filter/filter-radio.component";

@Component({
  selector: 'app-payment-details-page',
  imports: [
    CurrencyPipe,
    ButtonComponent,
    PageHeaderComponent,
    TuitionCardComponent,
    PageFooterComponent,
    FilterRadioComponent,
    PaymentDataCardComponent,
    TuitionCardSkeletonComponent,
    PaymentDataCardSkeletonComponent,
  ],
  templateUrl: './payment-details-page.component.html',
  styleUrl: './payment-details-page.component.scss'
})
export class PaymentDetailsPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly paymentService = inject(PaymentService);
  private readonly tuitionService = inject(TuitionService);

  private paymentId: string = '';

  protected readonly filterRadioOptions: FilterRadioOptions[] = [
    { label: 'Pagas', value: TuitionStatus.PAID },
    { label: 'Pendentes', value: TuitionStatus.PENDING },
  ] as const;

  protected payment!: PaymentResponse;
  protected tuitions: TuitionResponse[] = [];
  protected isLoadingPayment: boolean = false;
  protected isLoadingTuitions: boolean = false;
  protected selectedTuitionStatus: TuitionStatus = TuitionStatus.PAID;

  ngOnInit(): void {
    this.getPaymentId();
    this.getPayment();
    this.getTuitions();
  }

  protected handleStatusFilterChanged(selectedStatus: TuitionStatus) {
    this.selectedTuitionStatus = selectedStatus;
    this.getTuitions();
  }

  protected async copyStudentsNamesFromTuitons(): Promise<void> {
    try {
      const studentsNames: string = this.tuitions
        .map((tuition, index) => `${index + 1}- ${tuition.student.name}`)
        .join('\n');

      const title = `Lista de ${this.selectedTuitionStatus ? 'Pagamentos' : 'Pendentes'}`;
      const message = `*${title} - ${this.payment.month}:* \n${studentsNames}`;

      await navigator.clipboard.writeText(message);
      this.toastrService.success('Nomes copiados com sucesso!');
    } catch (err) {
      this.toastrService.error('Não foi possível copiar os nomes');
    }
  }

  protected removeTuitionFromList(index: number): void {
    this.tuitions.splice(index, 1);
  }

  private getPaymentId(): void {
    const paymentId: string | null = this.activatedRoute.snapshot.paramMap.get('id');

    if (paymentId === null) {
      this.toastrService.error('Falha ao carregar o pagamento, tente novamente mais tarde');
      this.goToPaymentsPage();
      return;
    }

    this.paymentId = paymentId;
  }

  private getPayment(): void {
    this.isLoadingPayment = true;
    this.paymentService.getPayment(this.paymentId)
      .pipe(take(1))
      .subscribe({
        next: (payment: PaymentResponse) => {
          this.payment = payment;
        },
        error: (errorMessage: string) => {
          this.toastrService.error(errorMessage);
          this.goToPaymentsPage();
        },
        complete: () => {
          this.isLoadingPayment = false;
        },
      });
  }

  private getTuitions(): void {
    this.isLoadingTuitions = true;
    this.tuitionService.getTuitions(this.paymentId, this.selectedTuitionStatus)
      .pipe(take(1))
      .subscribe({
        next: (tuitions: TuitionResponse[]) => {
          this.tuitions = tuitions;
        },
        error: (errorMessage: string) => {
          this.toastrService.error(errorMessage);
          this.goToPaymentsPage();
        },
        complete: () => {
          this.isLoadingTuitions = false;
        },
      });
  }

  private goToPaymentsPage() {
    this.router.navigate(['/payments']);
  }
}
