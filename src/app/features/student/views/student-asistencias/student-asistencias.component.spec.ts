import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAsistenciasComponent } from './student-asistencias.component';

describe('StudentAsistenciasComponent', () => {
  let component: StudentAsistenciasComponent;
  let fixture: ComponentFixture<StudentAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAsistenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
