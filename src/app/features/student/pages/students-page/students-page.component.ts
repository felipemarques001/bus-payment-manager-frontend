import { Student } from '../../models/student.interface';
import { finalize } from 'rxjs';
import { StudentService } from '../../../../core/services/student.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FilterRadioOptions } from '../../../../shared/models/filter-radio-options.interface';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StudentCardComponent } from '../../components/student-card/student-card.component';
import { PageCounterComponent } from '../../../../shared/components/page-counter/page-counter.component';
import { FilterRadioComponent } from '../../../../shared/components/radio-filter/filter-radio.component';
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
    ButtonComponent,
    PageHeaderComponent,
    StudentCardComponent,
    FilterRadioComponent,
    PageCounterComponent,
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

  protected readonly filterRadioOptions: FilterRadioOptions[] = [
    { label: 'Ativos', value: true },
    { label: 'Inativos', value: false },
  ] as const;

  protected pageNumber: number = 0;
  protected hasNextPage: boolean = false;
  protected totalStudents: number = 0;
  protected pseudoPageNumber = 1;
  protected students: Student[] = [];
  protected isLoading: boolean = false;
  protected isCreationModalOpened: boolean = false;
  protected selectedStudentsStatus: boolean = true;

  ngOnInit(): void {
    this.getStudents();
  }

  protected handleStatusFilterChanged(selectedStatus: boolean) {
    this.selectedStudentsStatus = selectedStatus;
    this.resetStudents();
  }

  protected openStudentCreationModal(): void {
    this.isCreationModalOpened = true;
    this.renderer.addClass(document.body, 'overflow-hidden');
  }

  protected closeStudentCreationModal(): void {
    this.isCreationModalOpened = false;
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }

  protected getStudents(): void {
    this.isLoading = true;
    this.studentService
      .getStudents(this.pageNumber, this.pageSize, this.selectedStudentsStatus)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((response) => {
        this.students = response.content;
        this.hasNextPage = !response.last;
        this.totalStudents = response.totalElements;
        this.pseudoPageNumber = response.pageNumber + 1;
      });
  }

  protected getNextStudents(): void {
    if (!this.hasNextPage || this.isLoading) return;

    this.pageNumber += 1;
    this.getStudents();
  }

  protected getPreviousStudents(): void {
    if (this.isLoading) return;

    this.pageNumber -= 1;
    this.getStudents();
  }

  private resetStudents(): void {
    this.pageNumber = 0;
    this.getStudents();
  }
}
