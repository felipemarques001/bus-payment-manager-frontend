import { FilterRadioOptions } from '../../models/filter-radio-options.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  OnInit,
  Output,
  inject,
  Input,
  Component,
  OnChanges,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-filter-radio',
  imports: [ReactiveFormsModule],
  templateUrl: './filter-radio.component.html',
  styleUrl: './filter-radio.component.scss'
})
export class FilterRadioComponent implements OnInit, OnChanges {
  @Input({ required: true }) options!: FilterRadioOptions[];
  @Input() disableForm: boolean = false;
  @Output() filterOptionChangedEmitter = new EventEmitter<any>();

  private readonly formBuilder = inject(FormBuilder);

  protected filterForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.filterForm === undefined) {
      return;
    }

    if (changes['disableForm']) {
      this.updateFormState();
    }
  }

  private initForm(): void {
    this.filterForm = this.formBuilder.nonNullable.group({
      filterOption: [this.options[0].value, [Validators.required]]
    });

    this.filterForm.valueChanges.subscribe(() => this.emitFilterOptionChanged());
  }

  private updateFormState(): void {
    if (this.disableForm) {
      this.filterForm.disable({ emitEvent: false });
    } else {
      this.filterForm.enable({ emitEvent: false });
    }
  }

  private emitFilterOptionChanged(): void {
    this.filterOptionChangedEmitter.emit(this.selectedFilterOption);
  }

  private get selectedFilterOption(): any {
    return this.filterForm.controls['filterOption'].value;
  }
}
