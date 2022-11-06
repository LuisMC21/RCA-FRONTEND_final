import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroLlamadasView } from './registro-llamadas.view';

describe('RegistroLlamadasView', () => {
  let component: RegistroLlamadasView;
  let fixture: ComponentFixture<RegistroLlamadasView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroLlamadasView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroLlamadasView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
