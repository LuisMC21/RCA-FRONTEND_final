import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAsistenciaComponent } from './teacher-asistencia.component';

describe('TeacherAsistenciaComponent', () => {
  let component: TeacherAsistenciaComponent;
  let fixture: ComponentFixture<TeacherAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAsistenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
