import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutReviewComponent } from './about-review.component';

describe('AboutReviewComponent', () => {
  let component: AboutReviewComponent;
  let fixture: ComponentFixture<AboutReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
