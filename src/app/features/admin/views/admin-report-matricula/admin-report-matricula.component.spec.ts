import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportMatriculaComponent } from './admin-report-matricula.component';

describe('AdminReportMatriculaComponent', () => {
  let component: AdminReportMatriculaComponent;
  let fixture: ComponentFixture<AdminReportMatriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReportMatriculaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReportMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
