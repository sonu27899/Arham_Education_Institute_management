import { TestBed, inject } from '@angular/core/testing';

import { QuestionPaperService } from './question-paper.service';

describe('QuestionPaperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionPaperService]
    });
  });

  it('should be created', inject([QuestionPaperService], (service: QuestionPaperService) => {
    expect(service).toBeTruthy();
  }));
});
