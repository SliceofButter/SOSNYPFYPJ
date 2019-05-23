import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileregstudentPage } from './profileregstudent.page';

describe('ProfileregstudentPage', () => {
  let component: ProfileregstudentPage;
  let fixture: ComponentFixture<ProfileregstudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileregstudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileregstudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
