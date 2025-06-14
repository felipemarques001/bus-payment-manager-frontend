import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StudentService } from '../../../../core/services/student.service';
import { finalize } from 'rxjs';
import { PaymentDateValidatorService } from '../../services/payment-date-validator.service';
import { NgxMaskDirective } from 'ngx-mask';
import { StudentSummaryCardComponent } from '../../components/student-summary-card/student-summary-card.component';
import { StudentSummary } from '../../models/student-summary.interface';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { AmountValidatorService } from '../../services/amount-validator.service';
import { PaymentRequest } from '../../models/payment-request.interface';
import { FinancialHelpRequest } from '../../models/financial-help-request.interface';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-creation-page',
  imports: [
    RouterLink,
    SpinnerComponent,
    NgxMaskDirective,
    ReactiveFormsModule,
    StudentSummaryCardComponent,
  ],
  templateUrl: './payment-creation-page.component.html',
  styleUrl: './payment-creation-page.component.scss'
})
export class PaymentCreationPageComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly studentService = inject(StudentService);
  private readonly paymentService = inject(PaymentService);
  private readonly amountValidator = inject(AmountValidatorService);
  private readonly paymentDateValidator = inject(PaymentDateValidatorService);

  protected isLoading: boolean = false;
  protected activeStudents: StudentSummary[] = [];
  protected isMonthsOptionsOpened: boolean = false;

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

  getActiveStudents(): void {
    this.isLoading = true;
    this.studentService.getStudentsForPayment()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((response) => {
        this.activeStudents = response.students;
        response.students.map((student) => this.paymentStudentsIds.push(student.id));
        this.initPaymentForm();
      });
  }

  initPaymentForm(): void {
    const actualYear = new Date().getFullYear().toString();
    const actualMonthIndex = new Date().getMonth();

    this.yearControl.setValue(actualYear);
    this.monthControl.setValue(this.monthsOptions[actualMonthIndex]);
  }

  toggleIsMonthsOptionsOpened(): void {
    this.isMonthsOptionsOpened = !this.isMonthsOptionsOpened;
  }

  addFinancialHelp(): void {
    const financialHelp = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required, this.amountValidator.validateAmount()]],
    });
    this.financialHelps.push(financialHelp);
  }

  removeFinancialHelp(index: number): void {
    this.financialHelps.removeAt(index);
  }

  addStudentToPayment(studentId: string): void {
    const hasStudent = this.paymentStudentsIds.includes(studentId);

    if (!hasStudent) {
      this.paymentStudentsIds.push(studentId);
    };
  }

  removeStudentFromPayment(studentId: string): void {
    const hasStudent = this.paymentStudentsIds.includes(studentId);

    if (hasStudent) {
      const index = this.paymentStudentsIds.indexOf(studentId);
      this.paymentStudentsIds.splice(index, 1);
    }
  }

  createPayment(): void {
    if (this.paymentFormGroup.invalid || this.isLoading) return;

    this.isLoading = true;
    const payment: PaymentRequest = {
      year: this.yearControl.value,
      month: this.monthControl.value,
      studentsIds: this.paymentStudentsIds,
      totalAmount: this.totalAmountControl.value,
      financialHelps: this.generateFinancialHelpsRequestList(),
    };

    this.paymentService.createPayment(payment)
      .pipe(finalize(() => this.router.navigate(['/'])))
      .subscribe(() => this.toastrService.success('Pagamento criado com sucesso!'));
  }

  private generateFinancialHelpsRequestList() {
    const financialHelpsList: FinancialHelpRequest[] = [];

    this.financialHelps.controls.forEach((financialHelp) => {
      financialHelpsList.push({
        name: financialHelp.get('name')?.value,
        amount: financialHelp.get('amount')?.value,
      });
    });

    return financialHelpsList;
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
