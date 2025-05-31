import { StudentService } from "./student.service";
import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Student } from "../models/student.interface";

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

  checkPhoneNumberExistsIgnoringCurrent(student: Student): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const phoneNumber = control.value;
      if (!phoneNumber) {
        return of(null);
      }

      const phoneNumberStr = String(phoneNumber);
      if (phoneNumberStr === student.phoneNumber) {
        return of(null);
      }

      if (phoneNumberStr.length !== 11) {
        return of(null);
      }

      return this.studentService.checkPhoneNumberExists(phoneNumberStr).pipe(
        map((exists: boolean) => exists ? { phoneNumberExists: true } : null),
        catchError(() => of(null))
      );
    };
  }
}