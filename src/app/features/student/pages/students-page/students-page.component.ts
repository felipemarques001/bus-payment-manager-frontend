import { Student } from '../../models/student.interface';
import { finalize } from 'rxjs';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentCardComponent } from '../../components/student-card/student-card.component';
import { StudentFilterComponent } from '../../../../shared/components/student-filter/student-filter.component';
import { StudentCardSkeletonComponent } from '../../components/student-card-skeleton/student-card-skeleton.component';
import { StudentCreationModalComponent } from '../../components/student-creation-modal/student-creation-modal.component';
import {
  OnInit,
  inject,
  Component,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-students-page',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    StudentCardComponent,
    StudentFilterComponent,
    StudentCardSkeletonComponent,
    StudentCreationModalComponent,
  ],
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.scss',
})
export class StudentsPageComponent implements OnInit {
  private readonly renderer = inject(Renderer2);
  private readonly studentService = inject(StudentService);
  
  private readonly pageSize: number = 24;
  private pageNumber: number = 0;
  protected hasNextPage: boolean = false;
  protected totalStudents: number = 0;
  protected pseudoPageNumber = 1;

  protected students: Student[] = [];
  protected isLoading: boolean = false;
  protected isCreationModalOpened: boolean = false;
  protected readonly studentCardSkeletonQuantity = Array.from({ length: this.pageSize });

  ngOnInit(): void {
    this.getStudents();
  }

  openStudentCreationModal(): void {
    this.isCreationModalOpened = true;
    this.renderer.addClass(document.body, 'overflow-hidden');
  }

  closeStudentCreationModal(): void {
    this.isCreationModalOpened = false;
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }

  getStudents(): void {
    this.isLoading = true;
    this.studentService
      .getStudents(this.pageNumber, this.pageSize)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((response) => {
        this.students = response.content;
        this.hasNextPage = !response.last;
        this.totalStudents = response.totalElements;
        this.pseudoPageNumber = response.pageNumber + 1;
      });
  }

  getNextStudents(): void {
    if (!this.hasNextPage || this.isLoading) return;

    this.pageNumber += 1;
    this.getStudents();
  }

  getPreviousStudents(): void {
    if (this.isLoading) return;

    this.pageNumber -= 1;
    this.getStudents();
  }

  inactivateStudent(studentId: string): void {
    this.studentService
      .patchActiveStatus(studentId, false)
      .subscribe(() => {
        this.students = this.students.filter((student) => student.id !== studentId);
      });
  }
}
