import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAsignacionesComponent } from './teacher-asignaciones.component';

describe('TeacherAsignacionesComponent', () => {
  let component: TeacherAsignacionesComponent;
  let fixture: ComponentFixture<TeacherAsignacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAsignacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
