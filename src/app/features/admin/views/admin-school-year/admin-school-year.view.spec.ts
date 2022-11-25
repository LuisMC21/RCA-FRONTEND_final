import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSchoolYearView } from './admin-school-year.view';

describe('AdminSchoolYearView', () => {
  let component: AdminSchoolYearView;
  let fixture: ComponentFixture<AdminSchoolYearView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSchoolYearView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSchoolYearView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
