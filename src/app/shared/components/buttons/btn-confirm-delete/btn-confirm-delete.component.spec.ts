import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnConfirmDeleteComponent } from './btn-confirm-delete.component';

describe('BtnConfirmDeleteComponent', () => {
  let component: BtnConfirmDeleteComponent;
  let fixture: ComponentFixture<BtnConfirmDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnConfirmDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
