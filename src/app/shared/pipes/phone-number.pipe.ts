import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(number: string): string {
    if (!number) return number;

    /** Remove qualquer caractere que não seja número */
    number = number.replace(/\D/g, '');

    if (number.length !== 11) return number;

    return `(${number.slice(0, 2)}) ${number.slice(2, 7)}-${number.slice(7)}`;
  }

}
