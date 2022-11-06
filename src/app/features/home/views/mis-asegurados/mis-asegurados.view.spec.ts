import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisAseguradosView } from './mis-asegurados.view';

describe('MisAseguradosView', () => {
  let component: MisAseguradosView;
  let fixture: ComponentFixture<MisAseguradosView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisAseguradosView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisAseguradosView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
