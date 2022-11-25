import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsView } from './admin-news.view';

describe('AdminNewsView', () => {
  let component: AdminNewsView;
  let fixture: ComponentFixture<AdminNewsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewsView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
