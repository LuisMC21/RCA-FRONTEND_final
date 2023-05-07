import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSeccionComponent } from './table-seccion.component';

describe('TableSeccionComponent', () => {
  let component: TableSeccionComponent;
  let fixture: ComponentFixture<TableSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSeccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
