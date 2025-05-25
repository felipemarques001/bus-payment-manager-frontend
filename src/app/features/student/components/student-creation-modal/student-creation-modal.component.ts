import { StudentService } from '../../services/student.service';
import { NgxMaskDirective } from 'ngx-mask';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentRequest } from '../../models/student-request.interface';
import { PhoneNumberValidatorService } from '../../services/phone-number-validator.service';
import { finalize } from 'rxjs';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-creation-modal',
  imports: [
    SpinnerComponent,
    NgxMaskDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './student-creation-modal.component.html',
  styleUrl: './student-creation-modal.component.scss'
})
export class StudentCreationModalComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly studentService = inject(StudentService);
  private readonly phoneNumberValidatorService = inject(PhoneNumberValidatorService);

  protected isLoading: boolean = false;

  @Output() private readonly closeModalEmmiter = new EventEmitter<void>();
  @Output() private readonly successCreationEmitter = new EventEmitter<void>();

  formGroup = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    major: ['', [Validators.required]],
    college: ['', [Validators.required]],
    phoneNumber: [
      '',
      [Validators.required, Validators.minLength(11), Validators.maxLength(11)],
      [this.phoneNumberValidatorService.checkPhoneNumberExists()],
    ],
  });

  emmitCloseDialog(): void {
    this.closeModalEmmiter.emit();
  }

  emmitSuccessCreation(): void {
    this.successCreationEmitter.emit();
  }

  createStudent(): void {
    if (this.formGroup.invalid) return;

    this.isLoading = true;
    const student: StudentRequest = {
      name: this.formControls.name.value,
      phoneNumber: this.formControls.phoneNumber.value,
      major: this.formControls.major.value,
      college: this.formControls.college.value,
    };

    this.studentService.createStudent(student)
      .pipe(
        finalize(() => this.isLoading = false),
      )
      .subscribe({
        next: () => {
          this.emmitCloseDialog();
          this.emmitSuccessCreation();
          this.toastrService.success("Estudante cadastrado com sucesso");
        },
      });
  }

  get formControls() {
    return this.formGroup.controls;
  }
}
