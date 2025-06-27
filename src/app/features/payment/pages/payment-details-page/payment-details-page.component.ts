import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { PageHeaderComponent } from "../../../../shared/components/page-header/page-header.component";
import { ActivatedRoute } from "@angular/router";
import { PaymentService } from "../../services/payment.service";
import { firstValueFrom, Observable, tap } from "rxjs";
import { PaymentResponse } from "../../models/payment-response.interface";
import { TuitionCardComponent } from "../../components/tuition-card/tuition-card.component";
import { PageFooterComponent } from "../../../../shared/components/page-footer/page-footer.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { ToastrService } from "ngx-toastr";
import { TuitionResponse } from "../../models/tuition-response.interface";

@Component({
  selector: 'app-payment-details-page',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    PageHeaderComponent,
    TuitionCardComponent,
    PageFooterComponent,
    ButtonComponent
  ],
  templateUrl: './payment-details-page.component.html',
  styleUrl: './payment-details-page.component.scss'
})
export class PaymentDetailsPageComponent implements OnInit {
  private readonly router = inject(ActivatedRoute);
  private readonly toastrService = inject(ToastrService);
  private readonly paymentService = inject(PaymentService);

  private paidTuitions!: TuitionResponse[];
  private notPaidTuitions!: TuitionResponse[];

  protected payment$ = new Observable<PaymentResponse>;

  ngOnInit(): void {
    const paymentId: string | null = this.router.snapshot.paramMap.get('id');

    if (paymentId) {
      this.getPayment(paymentId);
    }
  }

  async copyStudentsNamesFromTuitons(isTuitionPaid: boolean): Promise<void> {
    try {
      const payment = await firstValueFrom(this.payment$);
      const studentsNames = payment.tuitions
        .filter((tuition) => tuition.isPaid === isTuitionPaid)
        .map((tuition, index) => `${index + 1}- ${tuition.student.name}`)
        .join('\n');

      const message = `*Lista de pagamento - ${payment.month}:* \n${studentsNames}`;

      await navigator.clipboard.writeText(message);
      this.toastrService.success('Nomes copiados com sucesso!');
    } catch (err) {
      this.toastrService.error('Não foi possível copiar os nomes');
    }
  }

  private getPayment(paymentId: string): void {
    this.payment$ = this.paymentService.getPayment(paymentId)
      .pipe(tap((payment: PaymentResponse) => {
        this.paidTuitions = payment.tuitions.filter((tuition: TuitionResponse) => tuition.isPaid === true);
        this.notPaidTuitions = payment.tuitions.filter((tuition: TuitionResponse) => tuition.isPaid === false);
      }));
  }
}
