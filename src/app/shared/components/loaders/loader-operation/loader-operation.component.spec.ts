import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderOperationComponent } from './loader-operation.component';

describe('LoaderOperationComponent', () => {
  let component: LoaderOperationComponent;
  let fixture: ComponentFixture<LoaderOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
