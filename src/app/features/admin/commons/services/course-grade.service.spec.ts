import { TestBed } from '@angular/core/testing';

import { CourseGradeService } from './course-grade.service';

describe('CourseGradeService', () => {
  let service: CourseGradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseGradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
