import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() iconName: string | null = null;
  @Input({ required: true }) bodyText: string = '';
  @Input({ required: true }) type: 'primary-btn' | 'secondary-btn' = 'secondary-btn';
 
  @Output() private readonly buttonClickedEmitter = new EventEmitter<void>();

  emitButtonClicked(): void {
    this.buttonClickedEmitter.emit();
  }
}
