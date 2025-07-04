import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRadioComponent } from './filter-radio.component';

describe('RadioFilterComponent', () => {
  let component: FilterRadioComponent;
  let fixture: ComponentFixture<FilterRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
