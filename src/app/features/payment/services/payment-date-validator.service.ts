import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PaymentDateValidatorService {

  validateYear(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const year: string = control.value;
      if (!year) {
        return null;
      }

      return year.length !== 4 ? { invalid: true } : null;
    }
  }
}