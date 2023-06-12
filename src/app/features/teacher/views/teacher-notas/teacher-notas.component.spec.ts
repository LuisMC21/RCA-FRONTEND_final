import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherNotasComponent } from './teacher-notas.component';

describe('TeacherNotasComponent', () => {
  let component: TeacherNotasComponent;
  let fixture: ComponentFixture<TeacherNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherNotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
