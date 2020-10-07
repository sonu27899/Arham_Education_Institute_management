import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesPayComponent } from './fees-pay.component';

describe('FeesPayComponent', () => {
  let component: FeesPayComponent;
  let fixture: ComponentFixture<FeesPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
