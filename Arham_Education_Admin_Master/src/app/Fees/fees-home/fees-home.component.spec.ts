import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesHomeComponent } from './fees-home.component';

describe('FeesHomeComponent', () => {
  let component: FeesHomeComponent;
  let fixture: ComponentFixture<FeesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
