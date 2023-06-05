import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNotaComponent } from './table-nota.component';

describe('TableNotaComponent', () => {
  let component: TableNotaComponent;
  let fixture: ComponentFixture<TableNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableNotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
