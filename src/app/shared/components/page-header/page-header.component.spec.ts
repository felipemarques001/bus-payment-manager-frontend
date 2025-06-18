import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPageHeaderComponent } from './page-header.component';

describe('DefaultPageHeaderComponent', () => {
  let component: DefaultPageHeaderComponent;
  let fixture: ComponentFixture<DefaultPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultPageHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
