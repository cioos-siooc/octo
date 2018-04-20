import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapComponent} from './map.component';
import {OpenLayersComponent} from './open-layers/open-layers.component';
import {PopupComponent} from '../popup/popup.component';
import {CatalogComponent} from '../catalog/catalog.component';
import {TopicPickerComponent} from '../topic-picker/topic-picker.component';
import {LayerManagerComponent} from '../layer-manager/layer-manager.component';
import {reducers} from '../store/app.reducers';
import {StoreModule} from '@ngrx/store';
import {FormsModule} from '@angular/forms';
import {CategoryComponent} from '../catalog/category/category.component';
import {HttpLoaderFactory} from '../app.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {LayerInformationComponent} from '../layer-information/layer-information.component';
import {LayerPresentationComponent} from '../layer-presentation/layer-presentation.component';
import {MapClickComponent} from '../map-click/map-click.component';
import {KeepHtmlPipe} from '../pipes/keep-html.pipe';
import {TextFieldComponent} from '../shared/click-formatter/field/text-field/text-field.component';
import {UrlFieldComponent} from '../shared/click-formatter/field/url-field/url-field.component';
import {DateFieldComponent} from '../shared/click-formatter/field/date-field/date-field.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [
        MapComponent, OpenLayersComponent, PopupComponent, CatalogComponent, TopicPickerComponent, LayerManagerComponent,
        CategoryComponent, LayerInformationComponent, LayerPresentationComponent, MapClickComponent, KeepHtmlPipe,
        TextFieldComponent, UrlFieldComponent, DateFieldComponent
      ],
      imports: [
        StoreModule.forRoot(reducers),
        FormsModule,
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
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
