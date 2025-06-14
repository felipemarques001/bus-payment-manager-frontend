import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";


@Injectable({
    providedIn: 'root'
})
export class AmountValidatorService {

    validateAmount(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const amountStr: string = control.value;

            if (amountStr === '') {
                return null;
            }

            const amount = parseFloat(amountStr);
            return amount < 1.0 ? { lessThanOne: true } : null;
        }
    }

    validateIfFinancialHelpsSumExceedsTotalAmount(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const totalAmountStr: string = control.get('totalAmount')!.value;
            const financialHelps: FormArray = control.get('financialHelps') as FormArray;

            if (!totalAmountStr || financialHelps.length === 0) {
                return null;
            }

            const totalAmount = parseFloat(totalAmountStr);
            const totalFinancialHelps = this.sumFinancialHelpsAmounts(financialHelps);

            if (totalFinancialHelps === 0) {
                return null;
            }

            return totalAmount <= totalFinancialHelps 
                ? { financialHelpsExceedTotal: true } 
                : null;
        }
    }

    private sumFinancialHelpsAmounts(financialHelps: FormArray): number {
        let totalFinancialHelps = 0;

        for (const financialHelp of financialHelps.controls) {
            const amountStr: string = financialHelp.get('amount')?.value;

            /** if has at least one financial help without value, then return 0 */
            if (amountStr === '') {
                return 0;
            }

            const amount = parseFloat(amountStr);
            totalFinancialHelps += amount;
        }

        return totalFinancialHelps;
    }
}