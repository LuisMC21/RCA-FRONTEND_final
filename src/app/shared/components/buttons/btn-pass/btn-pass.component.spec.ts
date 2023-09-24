import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnPassComponent } from './btn-pass.component';

describe('BtnPassComponent', () => {
  let component: BtnPassComponent;
  let fixture: ComponentFixture<BtnPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
