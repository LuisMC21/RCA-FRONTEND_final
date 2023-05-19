import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableClassroomComponent } from './table-classroom.component';

describe('TableClassroomComponent', () => {
  let component: TableClassroomComponent;
  let fixture: ComponentFixture<TableClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableClassroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
