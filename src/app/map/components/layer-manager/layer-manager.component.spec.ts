/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EnumBehaviorComponent } from '@app/map/components/layer-manager/enum-behavior/enum-behavior.component';
import { LayerComponent } from '@app/map/components/layer-manager/layer/layer.component';
import { DateFieldComponent } from '@app/map/components/map-click/click-formatter/field/date-field/date-field.component';
import { ImageFieldComponent } from '@app/map/components/map-click/click-formatter/field/image-field/image-field.component';
import { TextFieldComponent } from '@app/map/components/map-click/click-formatter/field/text-field/text-field.component';
import { UrlFieldComponent } from '@app/map/components/map-click/click-formatter/field/url-field/url-field.component';
import { MapClickComponent } from '@app/map/components/map-click/map-click.component';
import { mapReducers } from '@app/map/store';
import { KeepHtmlPipe } from '@app/shared/pipes';
import { HttpLoaderFactory } from '@app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { LayerManagerComponent } from './layer-manager.component';
import { TimeBehaviorComponent } from './time-behavior/time-behavior.component';


describe('LayerManagerComponent', () => {
  let component: LayerManagerComponent;
  let fixture: ComponentFixture<LayerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayerManagerComponent,
        TimeBehaviorComponent,
        EnumBehaviorComponent,
        LayerComponent,
        MapClickComponent,
        KeepHtmlPipe,
        TextFieldComponent,
        UrlFieldComponent,
        ImageFieldComponent,
        DateFieldComponent
      ],
      imports: [
        FormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
        HttpClientModule,
        CalendarModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
      ],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
