import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAsistenciaComponent } from './table-asistencia.component';

describe('TableAsistenciaComponent', () => {
  let component: TableAsistenciaComponent;
  let fixture: ComponentFixture<TableAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableAsistenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
