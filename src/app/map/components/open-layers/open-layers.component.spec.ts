/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OpenLayersComponent} from './open-layers.component';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';
import {mapReducers} from '@app/map/store';

describe('OpenLayersComponent', () => {
  let component: OpenLayersComponent;
  let fixture: ComponentFixture<OpenLayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpenLayersComponent],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
        HttpClientModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
