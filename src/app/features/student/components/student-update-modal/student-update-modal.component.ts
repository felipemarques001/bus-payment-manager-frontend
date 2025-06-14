import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../../../core/services/student.service';
import { StudentRequest } from '../../models/student-request.interface';
import { NgxMaskDirective } from 'ngx-mask';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { PhoneNumberValidatorService } from '../../services/phone-number-validator.service';
import {
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  inject,
  Output,
  Component,
  EventEmitter,
  Input,
  OnInit,
} from '@angular/core';
import { Student } from '../../models/student.interface';

@Component({
  selector: 'app-student-update-modal',
  imports: [
    SpinnerComponent,
    NgxMaskDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './student-update-modal.component.html',
  styleUrl: './student-update-modal.component.scss'
})
export class StudentUpdateModalComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly studentService = inject(StudentService);
  private readonly phoneNumberValidatorService = inject(PhoneNumberValidatorService);

  protected isLoading: boolean = false;

  protected formGroup = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    major: ['', [Validators.required]],
    college: ['', [Validators.required]],
    phoneNumber: [ '', [Validators.required, Validators.minLength(11), Validators.maxLength(11)], []],
  });

  @Input({ required: true }) student!: Student;
  @Output() private readonly closeModalEmitter = new EventEmitter<void>();
  @Output() private readonly successUpdateEmitter = new EventEmitter<void>();

  ngOnInit(): void {
    this.populateFormWithStudentValues();
    this.setPhoneNumberValidatorInForm();
  }

  populateFormWithStudentValues(): void {
    this.formGroup.setValue({
      name: this.student.name,
      major: this.student.major,
      college: this.student.college,
      phoneNumber: this.student.phoneNumber,
    });
  }

  setPhoneNumberValidatorInForm(): void {
    this.formControls.phoneNumber.setAsyncValidators(
      this.phoneNumberValidatorService.checkPhoneNumberExistsIgnoringCurrent(this.student)
    );

    this.formControls.phoneNumber.updateValueAndValidity();
  }

  emmitCloseModal(): void {
    this.closeModalEmitter.emit();
  }

  emmitSuccessUpdate(): void {
    this.successUpdateEmitter.emit();
  }

  updateStudent(): void {
    if (this.formGroup.invalid || this.isLoading) return;

    this.isLoading = true;
    const studentId: string = this.student.id;
    const student: StudentRequest = {
      name: this.formControls.name.value,
      major: this.formControls.major.value,
      college: this.formControls.college.value,
      phoneNumber: this.formControls.phoneNumber.value,
    };

    this.studentService.updateStudent(studentId, student)
      .pipe(
        finalize(() => this.isLoading = false),
      )
      .subscribe({
        next: () => {
          this.emmitCloseModal();
          this.emmitSuccessUpdate();
          this.toastrService.success("Estudante editado com sucesso");
        },
      });
  }

  get formControls() {
    return this.formGroup.controls;
  }
}
