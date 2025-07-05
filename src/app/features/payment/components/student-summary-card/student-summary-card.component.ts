import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentSummary } from '../../models/student-summary.interface';
import { PhoneNumberPipe } from '../../../../shared/pipes/phone-number.pipe';

@Component({
  selector: 'app-student-summary-card',
  imports: [PhoneNumberPipe],
  templateUrl: './student-summary-card.component.html',
  styleUrl: './student-summary-card.component.scss'
})
export class StudentSummaryCardComponent {
  protected isStudentInPayment: boolean = true;

  @Input({ required: true }) student!: StudentSummary;
  @Output() addStudentToPaymentEmmiter = new EventEmitter<string>();
  @Output() removeStudentFromPaymentEmmiter = new EventEmitter<string>();

  protected addStudentToPayment(): void {
    this.isStudentInPayment = true;
    this.addStudentToPaymentEmmiter.emit(this.student.id);
  }

  protected removeStudentFromPayment(): void {
    this.isStudentInPayment = false;
    this.removeStudentFromPaymentEmmiter.emit(this.student.id);
  }
}
