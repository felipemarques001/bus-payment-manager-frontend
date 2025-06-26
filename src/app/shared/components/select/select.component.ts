import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent implements OnInit {
  @Input({ required: true }) labelText!: string;
  @Input({ required: true }) options!: string[];

  @Output() private readonly selectedOptionIndexEmitter = new EventEmitter<number>();

  protected optionSelected!: string;
  protected isOptionsOpened: boolean = false;

  ngOnInit(): void {
    this.optionSelected = this.options[0];
  }

  toggleIsOptionsOpened(): void {
    this.isOptionsOpened = !this.isOptionsOpened;
  }

  selectOption(index: number): void {
    this.optionSelected = this.options[index];
    this.toggleIsOptionsOpened();
    this.emitSelectedOptionIndex(index);
  }

  private emitSelectedOptionIndex(optionIndex: number): void {
    this.selectedOptionIndexEmitter.emit(optionIndex);
  }
}
