import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoucementHomeComponent } from './annoucement-home.component';

describe('AnnoucementHomeComponent', () => {
  let component: AnnoucementHomeComponent;
  let fixture: ComponentFixture<AnnoucementHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnoucementHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoucementHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
