import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCounterComponent } from './page-counter.component';

describe('PageCounterComponent', () => {
  let component: PageCounterComponent;
  let fixture: ComponentFixture<PageCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
