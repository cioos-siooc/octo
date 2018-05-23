import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapComponent} from './map.component';
import {OpenLayersComponent} from './components/open-layers/open-layers.component';
import {PopupComponent} from './components/popup/popup.component';
import {CatalogComponent} from './components/catalog/catalog.component';
import {TopicPickerComponent} from './components/topic-picker/topic-picker.component';
import {LayerManagerComponent} from './components/layer-manager/layer-manager.component';
import {reducers} from '../store/app.reducers';
import {StoreModule} from '@ngrx/store';
import {FormsModule} from '@angular/forms';
import {CategoryComponent} from './components/catalog/category/category.component';
import {HttpLoaderFactory} from '../shared/shared.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {LayerInformationComponent} from './components/layer-information/layer-information.component';
import {LayerPresentationComponent} from './components/layer-presentation/layer-presentation.component';
import {MapClickComponent} from './components/map-click/map-click.component';
import {KeepHtmlPipe} from '../shared/pipes/keep-html.pipe';
import {TextFieldComponent} from '../shared/click-formatter/field/text-field/text-field.component';
import {UrlFieldComponent} from '../shared/click-formatter/field/url-field/url-field.component';
import {DateFieldComponent} from '../shared/click-formatter/field/date-field/date-field.component';
import {ImageFieldComponent} from '../shared/click-formatter/field/image-field/image-field.component';
import {TimeBehaviorComponent} from './components/layer-manager/time-behavior/time-behavior.component';
import {UrlBehaviorService} from './components/layer-manager/url-behavior.service';
import {CalendarModule} from 'primeng/calendar';

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
        StoreModule.forRoot(reducers),
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
