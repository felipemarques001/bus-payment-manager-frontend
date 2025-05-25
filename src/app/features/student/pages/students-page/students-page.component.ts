import { Student } from '../../models/student.interface';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentCardComponent } from '../../components/student-card/student-card.component';
import { StudentFilterComponent } from '../../../../shared/components/student-filter/student-filter.component';
import { StudentCreationModalComponent } from '../../components/student-creation-modal/student-creation-modal.component';
import { 
  map, 
  finalize, 
  Observable,
} from 'rxjs';
import { 
  inject, 
  Component, 
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-students-page',
  imports: [
    AsyncPipe,
    RouterLink,
    SpinnerComponent,
    ReactiveFormsModule,
    StudentCardComponent,
    StudentFilterComponent,
    StudentCreationModalComponent,
],
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.scss',
})
export class StudentsPageComponent {
  private readonly renderer = inject(Renderer2);
  private readonly studentService = inject(StudentService);
  private pageNumber = 0;
  private pageSize = 40;

  protected students$ = new Observable<Student[]>();
  protected isLoading: boolean = false;

  isStudentCreationModalOpened = false;

  constructor() {
    this.getStudents();
  }

  openStudentCreationModal(): void {
    this.isStudentCreationModalOpened = true;
    this.renderer.addClass(document.body, 'overflow-hidden');
  }

  closeStudentCreationModal(): void {
    this.isStudentCreationModalOpened = false;
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }

  getStudents(): void {
    this.isLoading = true;
    this.students$ = this.studentService
      .getStudents(this.pageNumber, this.pageSize)
      .pipe(
        map(response => response.content),
        finalize(() => this.isLoading = false),
      );
  }
}
