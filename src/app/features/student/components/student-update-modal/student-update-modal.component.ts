import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../../../core/services/student.service';
import { StudentRequest } from '../../models/student-request.interface';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { NgxMaskDirective } from 'ngx-mask';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { PhoneNumberValidatorService } from '../../services/phone-number-validator.service';
import {
  Validators,
  FormBuilder,
  ReactiveFormsModule,
  FormControl,
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
    ButtonComponent,
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
    phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)], []],
  });

  @Input({ required: true }) student!: Student;
  @Output() private readonly closeModalEmitter = new EventEmitter<void>();
  @Output() private readonly successUpdateEmitter = new EventEmitter<void>();

  ngOnInit(): void {
    this.populateFormWithStudentValues();
    this.setPhoneNumberValidatorInForm();
  }

  emmitCloseModal(): void {
    this.closeModalEmitter.emit();
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

  protected isInputNotFilled(inputName: 'name' | 'college' | 'major' | 'phoneNumber'): boolean {
    const inputControl: FormControl<string> = this.formControls[inputName];
    return inputControl.errors?.['required'] && inputControl.touched;
  }

  protected isPhoneNumberNotCompleted(): boolean {
    const phoneNumberControl: FormControl<string> = this.formControls.phoneNumber;
    const isPhoneNumberInUse = (phoneNumberControl.errors?.['minlength'] || phoneNumberControl.errors?.['maxlength']) &&
      phoneNumberControl.touched &&
      phoneNumberControl.dirty;

    return isPhoneNumberInUse;
  }

  protected isPhoneNumberInUse(): boolean {
    const phoneNumberControl: FormControl<string> = this.formControls.phoneNumber;
    const isPhoneNumberInUse = (phoneNumberControl.errors?.['phoneNumberExists'] || phoneNumberControl.errors?.['maxlength']) &&
      phoneNumberControl.touched &&
      phoneNumberControl.dirty;

    return isPhoneNumberInUse;
  }

  private setPhoneNumberValidatorInForm(): void {
    this.formControls.phoneNumber.setAsyncValidators(
      this.phoneNumberValidatorService.checkPhoneNumberExistsIgnoringCurrent(this.student)
    );

    this.formControls.phoneNumber.updateValueAndValidity();
  }

  private populateFormWithStudentValues(): void {
    this.formGroup.setValue({
      name: this.student.name,
      major: this.student.major,
      college: this.student.college,
      phoneNumber: this.student.phoneNumber,
    });
  }

  private emmitSuccessUpdate(): void {
    this.successUpdateEmitter.emit();
  }

  get formControls() {
    return this.formGroup.controls;
  }
}
