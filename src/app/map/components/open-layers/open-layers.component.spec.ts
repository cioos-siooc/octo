/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '@app/app-routing.module';
import { CatalogComponent } from '@app/map/components/catalog/catalog.component';
import { CategoryComponent } from '@app/map/components/catalog/category/category.component';
import { LayerManagerComponent } from '@app/map/components/layer-manager/layer-manager.component';
import { LayerComponent } from '@app/map/components/layer-manager/layer/layer.component';
import { LayerPickerComponent } from '@app/map/components/layer-picker/layer-picker.component';
import { DateFieldComponent } from '@app/map/components/map-click/click-formatter/field/date-field/date-field.component';
import { ImageFieldComponent } from '@app/map/components/map-click/click-formatter/field/image-field/image-field.component';
import { TextFieldComponent } from '@app/map/components/map-click/click-formatter/field/text-field/text-field.component';
import { UrlFieldComponent } from '@app/map/components/map-click/click-formatter/field/url-field/url-field.component';
import { MapClickComponent } from '@app/map/components/map-click/map-click.component';
import { MapComponent } from '@app/map/components/map/map.component';
import { SidebarComponent } from '@app/map/components/sidebar/sidebar.component';
import { TopicPickerComponent } from '@app/map/components/topic-picker/topic-picker.component';
import { mapReducers } from '@app/map/store';
import { KeepHtmlPipe } from '@app/shared/pipes';
import { HttpLoaderFactory } from '@app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { OpenLayersComponent } from './open-layers.component';


describe('OpenLayersComponent', () => {
  let component: OpenLayersComponent;
  let fixture: ComponentFixture<OpenLayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        // { provide: TranslateService, useClass: TranslateServiceStub }
      ],
      declarations: [
        OpenLayersComponent,
        MapComponent,
        SidebarComponent,
        LayerManagerComponent,
        LayerPickerComponent,
        LayerComponent,
        TopicPickerComponent,
        CatalogComponent,
        MapClickComponent,
        CategoryComponent,
        TextFieldComponent,
        UrlFieldComponent,
        DateFieldComponent,
        ImageFieldComponent,
        KeepHtmlPipe
      ],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
        HttpClientModule,
        RouterTestingModule.withRoutes(routes),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const router = TestBed.get(Router);
    const location = TestBed.get(Location);

    fixture = TestBed.createComponent(OpenLayersComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
