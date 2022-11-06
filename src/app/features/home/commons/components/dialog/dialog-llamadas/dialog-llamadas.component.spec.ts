import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLlamadasComponent } from './dialog-llamadas.component';

describe('DialogLlamadasComponent', () => {
  let component: DialogLlamadasComponent;
  let fixture: ComponentFixture<DialogLlamadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLlamadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLlamadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
