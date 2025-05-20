import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './student-filter.component.html',
  styleUrl: './student-filter.component.scss'
})
export class StudentFilterComponent {
  readonly filterTypes = [
    { value: 'name', label: 'Nome' },
    { value: 'major', label: 'Graduação' },
    { value: 'college', label: 'Faculdade' },
  ];

  readonly filterFormGroup = new FormGroup({
    type: new FormControl(this.filterTypes[0].value),
    value: new FormControl(''),
  });

  isOptionsOpened: boolean = false;

  toggleIsOptionsOpened(): void {
    this.isOptionsOpened = !this.isOptionsOpened;
  }

  closeOptions(): void {
    this.isOptionsOpened = false;
  }

  onSearch(): void {
    console.log({
      type: this.filterFormGroup.get('type')?.value,
      value: this.filterFormGroup.get('value')?.value,
    });
  }

  get filterTypeSelected(): string {
    const typeSelected = this.filterFormGroup.get('type')?.value;
    for (const option of this.filterTypes) {
      if (typeSelected === option.value) {
        return option.label;
      }
    }

    return 'Valor inválido';
  }
}
