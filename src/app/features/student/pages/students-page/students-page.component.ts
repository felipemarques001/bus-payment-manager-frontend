import { Student } from '../../models/student.interface';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { map, Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentCardComponent } from '../../components/student-card/student-card.component';
import { StudentFilterComponent } from '../../../../shared/components/student-filter/student-filter.component';
import { inject, Component, Renderer2 } from '@angular/core';
import { StudentCreationModalComponent } from '../../components/student-creation-modal/student-creation-modal.component';

@Component({
  selector: 'app-students-page',
  imports: [
    AsyncPipe,
    RouterLink,
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
  private pageSize = 15;
  students$ = new Observable<Student[]>();

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

  private getStudents(): void {
    this.students$ = this.studentService
      .getStudents(this.pageNumber, this.pageSize)
      .pipe(
        map(response => response.content)
      );
  }
}
