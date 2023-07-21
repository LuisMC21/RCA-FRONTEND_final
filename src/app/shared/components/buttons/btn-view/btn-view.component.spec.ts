import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnViewComponent } from './btn-view.component';

describe('BtnViewComponent', () => {
  let component: BtnViewComponent;
  let fixture: ComponentFixture<BtnViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
