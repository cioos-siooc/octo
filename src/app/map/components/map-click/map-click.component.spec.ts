/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { mapReducers } from '@app/map/store';
import { KeepHtmlPipe } from '@app/shared/pipes';
import { HttpLoaderFactory } from '@app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DateFieldComponent } from './click-formatter/field/date-field/date-field.component';
import { ImageFieldComponent } from './click-formatter/field/image-field/image-field.component';
import { TextFieldComponent } from './click-formatter/field/text-field/text-field.component';
import { UrlFieldComponent } from './click-formatter/field/url-field/url-field.component';
import { MapClickComponent } from './map-click.component';


describe('MapClickComponent', () => {
  let component: MapClickComponent;
  let fixture: ComponentFixture<MapClickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        // { provide: TranslateService, useClass: TranslateServiceStub }
      ],
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
        HttpClientModule,
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
    fixture = TestBed.createComponent(MapClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
