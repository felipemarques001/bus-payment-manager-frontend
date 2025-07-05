import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageFooterComponent } from '../page-footer/page-footer.component';

@Component({
  selector: 'app-page-counter',
  imports: [
    PageFooterComponent,
  ],
  templateUrl: './page-counter.component.html',
  styleUrl: './page-counter.component.scss'
})
export class PageCounterComponent {
  @Input({ required: true }) entityName: string = '';
  @Input({ required: true }) isLoading: boolean = false;
  @Input({ required: true }) hasNextPage: boolean = false;
  @Input({ required: true }) pageNumber: number = 0;
  @Input({ required: true }) totalEntities: number = 0;

  @Output() getNextEntitiesEmitter = new EventEmitter<void>();
  @Output() getPreviousEntitiesEmitter = new EventEmitter<void>();

  protected getNextEntities(): void {
    this.getNextEntitiesEmitter.emit();
  }

  protected getPreviousEntities(): void {
    this.getPreviousEntitiesEmitter.emit();
  }
}
