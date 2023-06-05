import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableClaseComponent } from './table-clase.component';

describe('TableClaseComponent', () => {
  let component: TableClaseComponent;
  let fixture: ComponentFixture<TableClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableClaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
