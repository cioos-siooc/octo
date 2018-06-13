/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapComponent} from './map.component';
import {OpenLayersComponent} from '../open-layers/open-layers.component';
import {PopupComponent} from '../popup/popup.component';
import {CatalogComponent} from '../catalog/catalog.component';
import {TopicPickerComponent} from '../topic-picker/topic-picker.component';
import {LayerManagerComponent} from '../layer-manager/layer-manager.component';
import {StoreModule} from '@ngrx/store';
import {FormsModule} from '@angular/forms';
import {CategoryComponent} from '../catalog/category/category.component';
import {HttpLoaderFactory} from '../../../shared/shared.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {LayerInformationComponent} from '../layer-information/layer-information.component';
import {LayerPresentationComponent} from '../layer-presentation/layer-presentation.component';
import {MapClickComponent} from '../map-click/map-click.component';
import {KeepHtmlPipe} from '@app/shared/pipes';
import {TextFieldComponent} from '../map-click/click-formatter/field/text-field/text-field.component';
import {UrlFieldComponent} from '../map-click/click-formatter/field/url-field/url-field.component';
import {DateFieldComponent} from '../map-click/click-formatter/field/date-field/date-field.component';
import {ImageFieldComponent} from '../map-click/click-formatter/field/image-field/image-field.component';
import {TimeBehaviorComponent} from '../layer-manager/time-behavior/time-behavior.component';
import {UrlBehaviorService} from '@app/map/services';
import {CalendarModule} from 'primeng/calendar';
import {mapReducers} from '@app/map/store';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapComponent, OpenLayersComponent, PopupComponent, CatalogComponent, TopicPickerComponent, LayerManagerComponent,
        CategoryComponent, LayerInformationComponent, LayerPresentationComponent, MapClickComponent, KeepHtmlPipe,
        TextFieldComponent, UrlFieldComponent, DateFieldComponent, ImageFieldComponent, TimeBehaviorComponent
      ],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
        FormsModule,
        CalendarModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
      ],
      providers: [UrlBehaviorService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
