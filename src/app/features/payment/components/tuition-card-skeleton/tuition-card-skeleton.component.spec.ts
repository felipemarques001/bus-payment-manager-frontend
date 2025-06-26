import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuitionCardSkeletonComponent } from './tuition-card-skeleton.component';

describe('TuitionCardSkeletonComponent', () => {
  let component: TuitionCardSkeletonComponent;
  let fixture: ComponentFixture<TuitionCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TuitionCardSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuitionCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
