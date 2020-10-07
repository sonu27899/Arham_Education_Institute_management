import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnswersheetComponent } from './view-answersheet.component';

describe('ViewAnswersheetComponent', () => {
  let component: ViewAnswersheetComponent;
  let fixture: ComponentFixture<ViewAnswersheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAnswersheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAnswersheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
