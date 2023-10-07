import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnLockComponent } from './btn-lock.component';

describe('BtnLockComponent', () => {
  let component: BtnLockComponent;
  let fixture: ComponentFixture<BtnLockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnLockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
