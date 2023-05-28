import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportNotasComponent } from './admin-report-notas.component';

describe('AdminReportNotasComponent', () => {
  let component: AdminReportNotasComponent;
  let fixture: ComponentFixture<AdminReportNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReportNotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReportNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
