import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationstudentPage } from './registrationstudent.page';

describe('RegistrationstudentPage', () => {
  let component: RegistrationstudentPage;
  let fixture: ComponentFixture<RegistrationstudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationstudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationstudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
