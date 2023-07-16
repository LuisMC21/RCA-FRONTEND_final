import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportAsistenciaComponent } from './admin-report-asistencia.component';

describe('AdminReportAsistenciaComponent', () => {
  let component: AdminReportAsistenciaComponent;
  let fixture: ComponentFixture<AdminReportAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReportAsistenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReportAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
