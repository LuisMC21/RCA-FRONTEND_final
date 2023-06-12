import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDatosComponent } from './teacher-datos.component';

describe('TeacherDatosComponent', () => {
  let component: TeacherDatosComponent;
  let fixture: ComponentFixture<TeacherDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
