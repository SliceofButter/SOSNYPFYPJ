import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentprofilePage } from './studentprofile.page';

describe('StudentprofilePage', () => {
  let component: StudentprofilePage;
  let fixture: ComponentFixture<StudentprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentprofilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
