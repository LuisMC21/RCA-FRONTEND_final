import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParentView } from './admin-parent.view';

describe('AdminParentView', () => {
  let component: AdminParentView;
  let fixture: ComponentFixture<AdminParentView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminParentView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminParentView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
