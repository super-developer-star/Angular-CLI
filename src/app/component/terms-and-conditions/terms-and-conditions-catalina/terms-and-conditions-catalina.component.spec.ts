/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TermsAndConditionsCatalinaComponent } from './terms-and-conditions-catalina.component';

describe('TermsAndConditionsCatalinaComponent', () => {
  let component: TermsAndConditionsCatalinaComponent;
  let fixture: ComponentFixture<TermsAndConditionsCatalinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsAndConditionsCatalinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndConditionsCatalinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
