import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSearchComponent } from './btn-search.component';

describe('BtnSearchComponent', () => {
  let component: BtnSearchComponent;
  let fixture: ComponentFixture<BtnSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
