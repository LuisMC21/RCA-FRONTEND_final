import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroLecturasView } from './registro-lecturas.view';

describe('RegistroLecturasView', () => {
  let component: RegistroLecturasView;
  let fixture: ComponentFixture<RegistroLecturasView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroLecturasView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroLecturasView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
