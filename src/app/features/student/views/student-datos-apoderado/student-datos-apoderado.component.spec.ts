import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDatosApoderadoComponent } from './student-datos-apoderado.component';

describe('StudentDatosApoderadoComponent', () => {
  let component: StudentDatosApoderadoComponent;
  let fixture: ComponentFixture<StudentDatosApoderadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDatosApoderadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDatosApoderadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
