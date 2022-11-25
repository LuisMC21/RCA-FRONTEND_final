import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGradeComponent } from './table-grade.component';

describe('TableGradeComponent', () => {
  let component: TableGradeComponent;
  let fixture: ComponentFixture<TableGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableGradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
