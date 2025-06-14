import { Student } from '../../models/student.interface';
import { finalize } from 'rxjs';
import { StudentService } from '../../../../core/services/student.service';
import { PhoneNumberPipe } from '../../../../shared/pipes/phone-number.pipe';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { StudentUpdateModalComponent } from '../student-update-modal/student-update-modal.component';
import { 
  Input, 
  inject, 
  Output, 
  Renderer2,
  Component, 
  EventEmitter, 
} from '@angular/core';

@Component({
  selector: 'app-student-card',
  imports: [
    PhoneNumberPipe,
    SpinnerComponent,
    StudentUpdateModalComponent,
  ],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.scss'
})
export class StudentCardComponent {
  private readonly renderer = inject(Renderer2);
  private readonly studentService = inject(StudentService);

  protected isLoading: boolean = false;
  protected openActionsMenu: boolean = false;
  protected isUpdateModalOpened: boolean = false;

  @Input({ required: true }) student!: Student;
  @Output() private readonly updatedStudentEmitter = new EventEmitter<void>();

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
    this.openActionsMenu = false;
    this.isLoading = true;
    this.studentService
      .patchActiveStatus(this.student.id, !this.student.active)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(() => this.updatedStudentEmitter.emit());
  }
}
