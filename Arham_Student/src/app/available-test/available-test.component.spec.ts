import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTestComponent } from './available-test.component';

describe('AvailableTestComponent', () => {
  let component: AvailableTestComponent;
  let fixture: ComponentFixture<AvailableTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
