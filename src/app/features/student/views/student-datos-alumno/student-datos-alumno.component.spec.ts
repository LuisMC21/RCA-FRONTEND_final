import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDatosAlumnoComponent } from './student-datos-alumno.component';

describe('StudentDatosAlumnoComponent', () => {
  let component: StudentDatosAlumnoComponent;
  let fixture: ComponentFixture<StudentDatosAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDatosAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDatosAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
