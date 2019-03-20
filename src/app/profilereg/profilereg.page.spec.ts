import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileregPage } from './profilereg.page';

describe('ProfileregPage', () => {
  let component: ProfileregPage;
  let fixture: ComponentFixture<ProfileregPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileregPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileregPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
