import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyProfileUpdateComponent } from './faculty-profile-update.component';

describe('FacultyProfileUpdateComponent', () => {
  let component: FacultyProfileUpdateComponent;
  let fixture: ComponentFixture<FacultyProfileUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyProfileUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
