import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeacherView } from './admin-teacher.view';

describe('AdminTeacherView', () => {
  let component: AdminTeacherView;
  let fixture: ComponentFixture<AdminTeacherView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeacherView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeacherView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
