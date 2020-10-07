import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultySalaryComponent } from './faculty-salary.component';

describe('FacultySalaryComponent', () => {
  let component: FacultySalaryComponent;
  let fixture: ComponentFixture<FacultySalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultySalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultySalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
