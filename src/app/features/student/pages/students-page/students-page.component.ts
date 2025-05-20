import { Student } from '../../models/student.interface';
import { AsyncPipe } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { map, Observable } from 'rxjs';
import { inject, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StudentCardComponent } from '../../components/student-card/student-card.component';
import { StudentFilterComponent } from '../../../../shared/components/student-filter/student-filter.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-students-page',
  imports: [
    AsyncPipe,
    RouterLink,
    ReactiveFormsModule,
    StudentCardComponent,
    StudentFilterComponent,
  ],
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.scss'
})
export class StudentsPageComponent {
  private readonly studentService = inject(StudentService);

  private pageNumber = 0;
  private pageSize = 15;
  students$ = new Observable<Student[]>();

  searchField = new FormControl('');

  constructor() {
    this.getStudents();
  }

  private getStudents(): void {
    this.students$ = this.studentService
      .getStudents(this.pageNumber, this.pageSize)
      .pipe(
        map(response => response.content)
      );
  }
}
