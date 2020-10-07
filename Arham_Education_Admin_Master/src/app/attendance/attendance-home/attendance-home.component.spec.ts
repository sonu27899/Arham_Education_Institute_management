import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceHomeComponent } from './attendance-home.component';

describe('AttendanceHomeComponent', () => {
  let component: AttendanceHomeComponent;
  let fixture: ComponentFixture<AttendanceHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
