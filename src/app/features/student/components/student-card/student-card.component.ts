import { Student } from '../../models/student.interface';
import { PhoneNumberPipe } from '../../../../shared/pipes/phone-number.pipe';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student-card',
  imports: [PhoneNumberPipe],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.scss'
})
export class StudentCardComponent {
  @Input({ required: true }) student!: Student;

  openActionsMenu: boolean = false;

  toogleMenu(): void {
    this.openActionsMenu = !this.openActionsMenu;
  }
}
