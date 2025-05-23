import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-student-creation-modal',
  imports: [],
  templateUrl: './student-creation-modal.component.html',
  styleUrl: './student-creation-modal.component.scss'
})
export class StudentCreationModalComponent {
  @Output() closeModalEmmiter = new EventEmitter<void>();

  emmitCloseDialog() {
    this.closeModalEmmiter.emit();
  }
}
