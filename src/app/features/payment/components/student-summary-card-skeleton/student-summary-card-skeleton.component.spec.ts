import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSummaryCardSkeletonComponent } from './student-summary-card-skeleton.component';

describe('StudentSummaryCardSkeletonComponent', () => {
  let component: StudentSummaryCardSkeletonComponent;
  let fixture: ComponentFixture<StudentSummaryCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSummaryCardSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSummaryCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
