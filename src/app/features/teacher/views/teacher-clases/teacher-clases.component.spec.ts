import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherClasesComponent } from './teacher-clases.component';

describe('TeacherClasesComponent', () => {
  let component: TeacherClasesComponent;
  let fixture: ComponentFixture<TeacherClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherClasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
