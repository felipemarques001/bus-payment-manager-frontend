import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCreationModalComponent } from './student-creation-modal.component';

describe('StudentCreationDialogComponent', () => {
  let component: StudentCreationModalComponent;
  let fixture: ComponentFixture<StudentCreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCreationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
