import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnReportComponent } from './btn-report.component';

describe('BtnReportComponent', () => {
  let component: BtnReportComponent;
  let fixture: ComponentFixture<BtnReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
