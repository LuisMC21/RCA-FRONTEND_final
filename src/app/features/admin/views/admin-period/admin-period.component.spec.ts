import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPeriodComponent } from './admin-period.component';

describe('AdminPeriodComponent', () => {
  let component: AdminPeriodComponent;
  let fixture: ComponentFixture<AdminPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
