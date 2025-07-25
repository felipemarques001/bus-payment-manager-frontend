import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() isDisabled: boolean = false;
  @Input() iconName: string | null = null;
  @Input({ required: true }) bodyText: string = '';
  @Input({ required: true }) type: 'primary-btn' | 'secondary-btn' | 'delete-btn' = 'secondary-btn';
 
  @Output() private readonly buttonClickedEmitter = new EventEmitter<void>();

  protected emitButtonClicked(): void {
    this.buttonClickedEmitter.emit();
  }
}
