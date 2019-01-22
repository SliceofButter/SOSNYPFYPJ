import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenthomePage } from './studenthome.page';

describe('StudenthomePage', () => {
  let component: StudenthomePage;
  let fixture: ComponentFixture<StudenthomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudenthomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudenthomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
