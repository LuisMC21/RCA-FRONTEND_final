import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnOkComponent } from './btn-ok.component';

describe('BtnOkComponent', () => {
  let component: BtnOkComponent;
  let fixture: ComponentFixture<BtnOkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnOkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
