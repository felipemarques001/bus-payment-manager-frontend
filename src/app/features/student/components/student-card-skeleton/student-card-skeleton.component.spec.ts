import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCardSkeletonComponent } from './student-card-skeleton.component';

describe('StudentCardSkeletonComponent', () => {
  let component: StudentCardSkeletonComponent;
  let fixture: ComponentFixture<StudentCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCardSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
