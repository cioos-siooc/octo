/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapClickComponent} from './map-click.component';
import {KeepHtmlPipe} from '@app/shared/pipes';
import {StoreModule} from '@ngrx/store';
import {TextFieldComponent} from './click-formatter/field/text-field/text-field.component';
import {UrlFieldComponent} from './click-formatter/field/url-field/url-field.component';
import {DateFieldComponent} from './click-formatter/field/date-field/date-field.component';
import {ImageFieldComponent} from './click-formatter/field/image-field/image-field.component';
import {mapReducers} from '@app/map/store';

describe('MapClickComponent', () => {
  let component: MapClickComponent;
  let fixture: ComponentFixture<MapClickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapClickComponent,
        KeepHtmlPipe,
        TextFieldComponent,
        DateFieldComponent,
        UrlFieldComponent,
        ImageFieldComponent
      ],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
