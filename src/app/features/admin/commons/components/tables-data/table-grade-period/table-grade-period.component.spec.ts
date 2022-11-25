import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGradePeriodComponent } from './table-grade-period.component';

describe('TableGradePeriodComponent', () => {
  let component: TableGradePeriodComponent;
  let fixture: ComponentFixture<TableGradePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableGradePeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGradePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
