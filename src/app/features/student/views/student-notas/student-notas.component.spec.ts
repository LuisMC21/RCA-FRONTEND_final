import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNotasComponent } from './student-notas.component';

describe('StudentNotasComponent', () => {
  let component: StudentNotasComponent;
  let fixture: ComponentFixture<StudentNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentNotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
