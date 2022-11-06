import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLlamadaComponent } from './new-llamada.component';

describe('NewLlamadaComponent', () => {
  let component: NewLlamadaComponent;
  let fixture: ComponentFixture<NewLlamadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLlamadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLlamadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
