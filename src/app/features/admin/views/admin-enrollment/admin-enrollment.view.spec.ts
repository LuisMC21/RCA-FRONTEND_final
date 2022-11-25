import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEnrollmentView } from './admin-enrollment.view';

describe('AdminEnrollmentView', () => {
  let component: AdminEnrollmentView;
  let fixture: ComponentFixture<AdminEnrollmentView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEnrollmentView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEnrollmentView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
