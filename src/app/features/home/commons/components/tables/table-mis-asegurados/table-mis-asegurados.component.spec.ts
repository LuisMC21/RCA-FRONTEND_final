import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMisAseguradosComponent } from './table-mis-asegurados.component';

describe('TableMisAseguradosComponent', () => {
  let component: TableMisAseguradosComponent;
  let fixture: ComponentFixture<TableMisAseguradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableMisAseguradosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMisAseguradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
