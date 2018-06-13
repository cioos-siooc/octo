/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LayerInformationComponent} from './layer-information.component';
import {StoreModule} from '@ngrx/store';
import {mapReducers} from '@app/map/store';

describe('LayerInformationComponent', () => {
  let component: LayerInformationComponent;
  let fixture: ComponentFixture<LayerInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayerInformationComponent],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
