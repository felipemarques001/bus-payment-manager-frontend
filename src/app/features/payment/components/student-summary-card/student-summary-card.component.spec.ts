import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSummaryCardComponent } from './student-summary-card.component';

describe('StudentSummaryCardComponent', () => {
  let component: StudentSummaryCardComponent;
  let fixture: ComponentFixture<StudentSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSummaryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
