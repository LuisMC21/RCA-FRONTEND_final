import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentView } from './admin-student.view';

describe('AdminStudentView', () => {
  let component: AdminStudentView;
  let fixture: ComponentFixture<AdminStudentView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
