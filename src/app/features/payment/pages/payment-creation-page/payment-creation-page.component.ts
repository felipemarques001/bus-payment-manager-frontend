import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../services/payment.service';
import { StudentService } from '../../../../core/services/student.service';
import { StudentSummary } from '../../models/student-summary.interface';
import { PaymentRequest } from '../../models/payment-request.interface';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { NgxMaskDirective } from 'ngx-mask';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { StudentsForPayment } from '../../models/students-for-payment.interface';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { PageFooterComponent } from '../../../../shared/components/page-footer/page-footer.component';
import { FinancialHelpRequest } from '../../models/financial-help-request.interface';
import { AmountValidatorService } from '../../services/amount-validator.service';
import { PaymentDateValidatorService } from '../../services/payment-date-validator.service';
import { StudentSummaryCardComponent } from '../../components/student-summary-card/student-summary-card.component';
import { PaymentAmountsModalComponent } from '../../components/payment-amounts-modal/payment-amounts-modal.component';
import { inject, Component, Renderer2 } from '@angular/core';
import { StudentSummaryCardSkeletonComponent } from '../../components/student-summary-card-skeleton/student-summary-card-skeleton.component';
import {
  of,
  map,
  finalize,
  Observable,
  catchError,
} from 'rxjs';
import {
  FormArray,
  Validators,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-payment-creation-page',
  imports: [
    AsyncPipe,
    SelectComponent,
    ButtonComponent,
    SpinnerComponent,
    NgxMaskDirective,
    ReactiveFormsModule,
    PageFooterComponent,
    PageHeaderComponent,
    StudentSummaryCardComponent,
    PaymentAmountsModalComponent,
    StudentSummaryCardSkeletonComponent,
  ],
  templateUrl: './payment-creation-page.component.html',
  styleUrl: './payment-creation-page.component.scss'
})
export class PaymentCreationPageComponent {
  private readonly router = inject(Router);
  private readonly renderer = inject(Renderer2);
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly studentService = inject(StudentService);
  private readonly paymentService = inject(PaymentService);
  private readonly amountValidator = inject(AmountValidatorService);
  private readonly paymentDateValidator = inject(PaymentDateValidatorService);

  protected isLoading: boolean = false;
  protected activeStudents$ = new Observable<StudentSummary[]>;
  protected isPaymentAmountsModalOpened: boolean = false;

  protected readonly paymentStudentsIds: string[] = [];
  protected readonly monthsOptions = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  protected readonly paymentFormGroup = this.formBuilder.nonNullable.group(
    {
      totalAmount: ['', [Validators.required, this.amountValidator.validateAmount()]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required, this.paymentDateValidator.validateYear()]],
      financialHelps: this.formBuilder.array([]),
    },
    {
      validators: [this.amountValidator.validateIfFinancialHelpsSumExceedsTotalAmount()]
    },
  );

  ngOnInit(): void {
    this.getActiveStudents();
  }

  protected updateSelectedMonthOption(monthIndex: number) {
    const selectedMonth: string = this.monthsOptions[monthIndex];
    this.monthControl.setValue(selectedMonth);
  }

  protected addFinancialHelp(): void {
    const financialHelp = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required, this.amountValidator.validateAmount()]],
    });
    this.financialHelps.push(financialHelp);
  }

  protected removeFinancialHelp(index: number): void {
    this.financialHelps.removeAt(index);
  }

  protected addStudentToPayment(studentId: string): void {
    const hasStudent = this.paymentStudentsIds.includes(studentId);

    if (!hasStudent) {
      this.paymentStudentsIds.push(studentId);
    };
  }

  protected removeStudentFromPayment(studentId: string): void {
    const hasStudent = this.paymentStudentsIds.includes(studentId);

    if (hasStudent) {
      const index = this.paymentStudentsIds.indexOf(studentId);
      this.paymentStudentsIds.splice(index, 1);
    }
  }

  protected createPayment(): void {
    if (this.paymentFormGroup.invalid || this.isLoading) return;

    if (this.paymentStudentsIds.length === 0) {
      this.toastrService.error('Não é possível gerar o pagamento sem estudantes');
      return;
    }

    this.isLoading = true;

    const payment: PaymentRequest = {
      invoiceYear: this.yearControl.value,
      invoiceMonth: this.monthControl.value,
      studentsIds: this.paymentStudentsIds,
      totalAmount: this.totalAmountControl.value,
      financialHelps: this.generateFinancialHelpsRequestList(),
    };

    this.paymentService.createPayment(payment)
      .pipe(
        catchError((errorMessage: string) => {
          this.toastrService.error(errorMessage);
          return of();
        }),

        finalize(() => this.isLoading = false)
      )
      .subscribe(() => {
        this.toastrService.success('Pagamento criado com sucesso!');
        this.router.navigate(['/payments']);
      });
  }

  protected openPaymentAmountsModal(): void {
    if (this.paymentStudentsIds.length === 0) {
      this.toastrService.error('Não é possível calcular o pagamento sem estudantes');
      return;
    }

    this.isPaymentAmountsModalOpened = true;
    this.renderer.addClass(document.body, 'overflow-hidden');
  }

  protected closePaymentAmountsModal(): void {
    this.isPaymentAmountsModalOpened = false;
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }

  protected generateFinancialHelpsRequestList() {
    const financialHelpsList: FinancialHelpRequest[] = [];

    this.financialHelps.controls.forEach((financialHelp) => {
      financialHelpsList.push({
        name: financialHelp.get('name')?.value,
        amount: financialHelp.get('amount')?.value,
      });
    });

    return financialHelpsList;
  }

  private getActiveStudents(): void {
    this.activeStudents$ = this.studentService.getStudentsForPayment()
      .pipe(
        map((response: StudentsForPayment) => {
          response.students.map(
            (student: StudentSummary) => this.paymentStudentsIds.push(student.id)
          );
          return response.students;
        }),

        finalize(() => this.initPaymentFormValues()),

        catchError((errorMessage: string) => {
          this.toastrService.error(errorMessage);
          this.router.navigate(['/']);
          return of();
        }),
      );
  }

  private initPaymentFormValues(): void {
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = this.monthsOptions[this.currentMonthIndex];
    this.yearControl.setValue(currentYear);
    this.monthControl.setValue(currentMonth);
  }

  get currentMonthIndex(): number {
    return new Date().getMonth();
  }

  get totalAmountControl(): FormControl<string> {
    return this.paymentFormGroup.controls.totalAmount;
  }

  get monthControl(): FormControl<string> {
    return this.paymentFormGroup.controls.month;
  }

  get yearControl(): FormControl<string> {
    return this.paymentFormGroup.controls.year;
  }

  get financialHelps(): FormArray {
    return this.paymentFormGroup.controls.financialHelps as FormArray;
  }
}
