import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEnrollmentComponent } from './table-enrollment.component';

describe('TableEnrollmentComponent', () => {
  let component: TableEnrollmentComponent;
  let fixture: ComponentFixture<TableEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableEnrollmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
