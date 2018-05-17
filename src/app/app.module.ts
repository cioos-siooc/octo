import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {environment} from '../environments/environment.prod';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CatalogComponent} from './catalog/catalog.component';
import {CategoryComponent} from './catalog/category/category.component';
import {CatalogEffects} from './catalog/store/catalog.effects';
import {HeaderComponent} from './header/header.component';
import {MapComponent} from './map/map.component';
import {OpenLayersComponent} from './map/open-layers/open-layers.component';
import {LayerEffects} from './map/store/layer.effects';
import {PopupComponent} from './popup/popup.component';
import {metaReducers, reducers} from './store/app.reducers';
import {TopicPickerComponent} from './topic-picker/topic-picker.component';
import {LayerManagerComponent} from './layer-manager/layer-manager.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AngularDraggableModule} from 'angular2-draggable';
import {LayerInformationComponent} from './layer-information/layer-information.component';
import {LayerInformationEffects} from './layer-information/store/layer-information.effects';
import {LayerPresentationComponent} from './layer-presentation/layer-presentation.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MapClickComponent} from './map-click/map-click.component';
import {KeepHtmlPipe} from './pipes/keep-html.pipe';
import {TextFieldComponent} from './shared/click-formatter/field/text-field/text-field.component';
import {UrlFieldComponent} from './shared/click-formatter/field/url-field/url-field.component';
import {DateFieldComponent} from './shared/click-formatter/field/date-field/date-field.component';
import {ImageFieldComponent} from './shared/click-formatter/field/image-field/image-field.component';
import {TimeBehaviorComponent} from './layer-manager/time-behavior/time-behavior.component';
import {UrlBehaviorService} from './layer-manager/url-behavior.service';
import {CalendarModule} from 'primeng/calendar';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    OpenLayersComponent,
    HeaderComponent,
    CatalogComponent,
    PopupComponent,
    CategoryComponent,
    CategoryComponent,
    TopicPickerComponent,
    LayerManagerComponent,
    LayerInformationComponent,
    LayerPresentationComponent,
    MapClickComponent,
    KeepHtmlPipe,
    TextFieldComponent,
    UrlFieldComponent,
    DateFieldComponent,
    ImageFieldComponent,
    TimeBehaviorComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularDraggableModule,
    CalendarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([LayerEffects, CatalogEffects, LayerInformationEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    AppRoutingModule
  ],
  providers: [UrlBehaviorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
