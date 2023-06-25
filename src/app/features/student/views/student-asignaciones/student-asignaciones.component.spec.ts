import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAsignacionesComponent } from './student-asignaciones.component';

describe('StudentAsignacionesComponent', () => {
  let component: StudentAsignacionesComponent;
  let fixture: ComponentFixture<StudentAsignacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAsignacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
