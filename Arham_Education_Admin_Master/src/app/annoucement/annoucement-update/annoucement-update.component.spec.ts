import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoucementUpdateComponent } from './annoucement-update.component';

describe('AnnoucementUpdateComponent', () => {
  let component: AnnoucementUpdateComponent;
  let fixture: ComponentFixture<AnnoucementUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnoucementUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoucementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
