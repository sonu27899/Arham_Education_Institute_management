import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoucementAddComponent } from './annoucement-add.component';

describe('AnnoucementAddComponent', () => {
  let component: AnnoucementAddComponent;
  let fixture: ComponentFixture<AnnoucementAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnoucementAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoucementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
