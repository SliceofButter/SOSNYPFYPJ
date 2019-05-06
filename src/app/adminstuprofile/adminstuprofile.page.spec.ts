import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminstuprofilePage } from './adminstuprofile.page';

describe('AdminstuprofilePage', () => {
  let component: AdminstuprofilePage;
  let fixture: ComponentFixture<AdminstuprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminstuprofilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminstuprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
