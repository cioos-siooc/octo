/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UrlFieldComponent} from './url-field.component';
import {FormsModule} from '@angular/forms';

describe('UrlFieldComponent', () => {
  let component: UrlFieldComponent;
  let fixture: ComponentFixture<UrlFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UrlFieldComponent
      ],
      imports: [
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
