import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestionPaperComponent } from './view-question-paper.component';

describe('ViewQuestionPaperComponent', () => {
  let component: ViewQuestionPaperComponent;
  let fixture: ComponentFixture<ViewQuestionPaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewQuestionPaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuestionPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
