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
  FormControl,
} from '@angular/forms';
import {
  inject,
  Output,
  Component,
  EventEmitter,
} from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-student-creation-modal',
  imports: [
    ButtonComponent,
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

  @Output() private readonly closeModalEmitter = new EventEmitter<void>();
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

  protected emmitCloseModal(): void {
    this.closeModalEmitter.emit();
  }

  protected createStudent(): void {
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
          this.emmitCloseModal();
          this.emmitSuccessCreation();
          this.toastrService.success("Estudante cadastrado com sucesso");
        },

        error: (errorMessage: string) => {
          this.toastrService.error(errorMessage);
          this.emmitCloseModal();
        }
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

  private emmitSuccessCreation(): void {
    this.successCreationEmitter.emit();
  }

  get formControls() {
    return this.formGroup.controls;
  }
}
