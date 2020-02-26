/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LayerInformationComponent} from './layer-information.component';
import {StoreModule} from '@ngrx/store';
import {mapReducers} from '@app/map/store';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '@app/shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

describe('LayerInformationComponent', () => {
  let component: LayerInformationComponent;
  let fixture: ComponentFixture<LayerInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayerInformationComponent],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerInformationComponent);
    component = fixture.componentInstance;

    const layerInformation = {
      layerId: 0,
      urls: [{
        id: 0,
        label: '',
        value: '',
        url: ''
      }]
    };

    component.layerInformation = layerInformation;
    console.log(component);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
