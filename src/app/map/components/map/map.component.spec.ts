import { OLLayerFactory } from './../../utils/open-layers/ol-layer-factory.util';
import { MapService } from '@app/map/utils/open-layers/map.service';
import { BehaviorHandlerFactory } from './../../utils/behavior-handler/behavior-handler-factory.service';
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
// import { ActivatedRoute } from '@angular/router';
import { routes } from '@app/app-routing.module';
import { EnumBehaviorComponent } from '@app/map/components/enum-behavior/enum-behavior.component';
import { LayerComponent } from '@app/map/components/layer-manager/layer/layer.component';
import { LayerPickerComponent } from '@app/map/components/layer-picker/layer-picker.component';
import { SidebarComponent } from '@app/map/components/sidebar/sidebar.component';
import { UrlBehaviorService } from '@app/map/services';
import { mapReducers } from '@app/map/store';
import { KeepHtmlPipe } from '@app/shared/pipes';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { HttpLoaderFactory } from '../../../shared/shared.module';
import { CatalogComponent } from '../catalog/catalog.component';
import { CategoryComponent } from '../catalog/category/category.component';
import { LayerInformationComponent } from '../layer-information/layer-information.component';
import { LayerManagerComponent } from '../layer-manager/layer-manager.component';
import { TimeBehaviorComponent } from '../time-behavior/time-behavior.component';
import { LayerPresentationComponent } from '../layer-presentation/layer-presentation.component';
import { DateFieldComponent } from '../map-click/click-formatter/field/date-field/date-field.component';
import { ImageFieldComponent } from '../map-click/click-formatter/field/image-field/image-field.component';
import { TextFieldComponent } from '../map-click/click-formatter/field/text-field/text-field.component';
import { UrlFieldComponent } from '../map-click/click-formatter/field/url-field/url-field.component';
import { MapClickComponent } from '../map-click/map-click.component';
import { OpenLayersComponent } from '../open-layers/open-layers.component';
import { TopicPickerComponent } from '../topic-picker/topic-picker.component';
import { MapComponent } from './map.component';
import { NgDragDropModule } from 'ng-drag-drop';
import { StylerService } from '@app/map/utils/open-layers/styler.service';


describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        // { provide: TranslateService, useClass: TranslateServiceStub },
        UrlBehaviorService, BehaviorHandlerFactory, MapService, OLLayerFactory, StylerService
      ],
      declarations: [
        MapComponent, OpenLayersComponent, CatalogComponent, TopicPickerComponent, LayerManagerComponent,
        CategoryComponent, LayerInformationComponent, LayerPresentationComponent, MapClickComponent, KeepHtmlPipe,
        TextFieldComponent, UrlFieldComponent, DateFieldComponent, ImageFieldComponent, TimeBehaviorComponent,
        EnumBehaviorComponent, SidebarComponent, LayerComponent, LayerPickerComponent
      ],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
        FormsModule,
        NgbModalModule.forRoot(),
        CalendarModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(routes),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        NgbModule.forRoot(),
        NgDragDropModule.forRoot(),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const translateService = TestBed.get(TranslateService);
    translateService.use('en');

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
