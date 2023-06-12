import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAsignacionesComponent } from './table-asignaciones.component';

describe('TableAsignacionesComponent', () => {
  let component: TableAsignacionesComponent;
  let fixture: ComponentFixture<TableAsignacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableAsignacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
