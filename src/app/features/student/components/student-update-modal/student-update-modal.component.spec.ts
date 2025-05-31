import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUpdateModalComponent } from './student-update-modal.component';

describe('StudentUpdateModalComponent', () => {
  let component: StudentUpdateModalComponent;
  let fixture: ComponentFixture<StudentUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentUpdateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
