import { Student } from '../../models/student.interface';
import { PhoneNumberPipe } from '../../../../shared/pipes/phone-number.pipe';
import { StudentUpdateModalComponent } from '../student-update-modal/student-update-modal.component';
import { Component, EventEmitter, inject, Input, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-student-card',
  imports: [
    PhoneNumberPipe,
    StudentUpdateModalComponent,
  ],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.scss'
})
export class StudentCardComponent {
  private readonly renderer = inject(Renderer2);

  protected openActionsMenu: boolean = false;
  protected isUpdateModalOpened: boolean = false;

  @Input({ required: true }) student!: Student;
  @Output() private readonly activeStudentEmitter = new EventEmitter<string>(); 
  @Output() private readonly updatedStudentEmitter = new EventEmitter<void>();
  @Output() private readonly inactiveStudentEmitter = new EventEmitter<string>(); 

  toogleMenu(): void {
    this.openActionsMenu = !this.openActionsMenu;
  }

  openStudentUpdateModal(): void {
    this.isUpdateModalOpened = true;
    this.renderer.addClass(document.body, 'overflow-hidden');
  }

  closeStudentUpdateModal(): void {
    this.openActionsMenu = false;
    this.isUpdateModalOpened = false;
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }

  emmitStudentUpdated(): void {
    this.closeStudentUpdateModal();
    this.updatedStudentEmitter.emit();
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
