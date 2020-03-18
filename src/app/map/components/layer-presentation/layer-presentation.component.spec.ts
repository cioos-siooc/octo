/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LayerPresentationComponent} from './layer-presentation.component';
import {HttpLoaderFactory} from '@app/shared/shared.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {mapReducers} from '@app/map/store';

describe('LayerPresentationComponent', () => {
  let component: LayerPresentationComponent;
  let fixture: ComponentFixture<LayerPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayerPresentationComponent],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
        HttpClientModule,
        FormsModule,
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
    fixture = TestBed.createComponent(LayerPresentationComponent);
    component = fixture.componentInstance;

    const layerId = 0;
    component.layerId = layerId;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
