import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCancelComponent } from './btn-cancel.component';

describe('BtnCancelComponent', () => {
  let component: BtnCancelComponent;
  let fixture: ComponentFixture<BtnCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnCancelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
