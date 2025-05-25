import { inject, Injectable } from "@angular/core";
import { StudentService } from "./student.service";
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberValidatorService {
  private readonly studentService = inject(StudentService);

  checkPhoneNumberExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const phoneNumber = control.value;
      if (!phoneNumber) {
        return of(null);
      }

      const phoneNumberStr = String(phoneNumber);
      if (phoneNumberStr.length !== 11) {
        return of(null);
      }

      return this.studentService.checkPhoneNumberExists(phoneNumberStr)
        .pipe(
          map((exists: boolean) => exists ? { phoneNumberExists: true } : null),
          catchError(() => of(null))
        );
    }
  }
}