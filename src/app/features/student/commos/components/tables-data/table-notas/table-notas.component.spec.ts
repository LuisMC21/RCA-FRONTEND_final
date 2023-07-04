import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNotasComponent } from './table-notas.component';

describe('TableNotasComponent', () => {
  let component: TableNotasComponent;
  let fixture: ComponentFixture<TableNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableNotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
