import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicuploadPage } from './picupload.page';

describe('PicuploadPage', () => {
  let component: PicuploadPage;
  let fixture: ComponentFixture<PicuploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicuploadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicuploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
