import { Student } from '../../models/student.interface';
import { PhoneNumberPipe } from '../../../../shared/pipes/phone-number.pipe';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-student-card',
  imports: [PhoneNumberPipe],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.scss'
})
export class StudentCardComponent {
  @Input({ required: true }) student!: Student;
  @Output() private readonly activeStudentEmitter = new EventEmitter<string>(); 
  @Output() private readonly inactiveStudentEmitter = new EventEmitter<string>(); 

  openActionsMenu: boolean = false;

  toogleMenu(): void {
    this.openActionsMenu = !this.openActionsMenu;
  }

  changeStudentActiveStatus(): void {
    if (this.student.active) {
      this.inactivateStudent();
    } else {
      this.activateStudent();
    }
  }

  activateStudent(): void {
    this.activeStudentEmitter.emit(this.student.id);
  }

  inactivateStudent(): void {
    this.inactiveStudentEmitter.emit(this.student.id);
  }
}
