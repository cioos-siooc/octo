import {NgModule} from '@angular/core';
import {MapComponent} from './components/map/map.component';
import {OpenLayersComponent} from './components/open-layers/open-layers.component';
import {CatalogComponent} from './components/catalog/catalog.component';
import {PopupComponent} from './components/popup/popup.component';
import {CategoryComponent} from './components/catalog/category/category.component';
import {TopicPickerComponent} from './components/topic-picker/topic-picker.component';
import {LayerManagerComponent} from './components/layer-manager/layer-manager.component';
import {LayerInformationComponent} from './components/layer-information/layer-information.component';
import {LayerPresentationComponent} from './components/layer-presentation/layer-presentation.component';
import {MapClickComponent} from './components/map-click/map-click.component';
import {TimeBehaviorComponent} from './components/layer-manager/time-behavior/time-behavior.component';
import {SharedModule} from '../shared/shared.module';
import {TextFieldComponent} from './components/map-click/click-formatter/field/text-field/text-field.component';
import {ImageFieldComponent} from './components/map-click/click-formatter/field/image-field/image-field.component';
import {DateFieldComponent} from './components/map-click/click-formatter/field/date-field/date-field.component';
import {UrlFieldComponent} from './components/map-click/click-formatter/field/url-field/url-field.component';
import {CalendarModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularDraggableModule} from 'angular2-draggable';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {mapReducers} from './store/reducers/map.reducers';
import {LayerInformationEffects} from './store/effects/layer-information.effects';
import {CatalogEffects} from './store/effects/catalog.effects';
import {LayerEffects} from './store/effects/layer.effects';

@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    CalendarModule,
    AngularDraggableModule,
    StoreModule.forFeature('map', mapReducers),
    EffectsModule.forFeature([LayerEffects, CatalogEffects, LayerInformationEffects]),
  ],
  declarations: [
    MapComponent,
    OpenLayersComponent,
    CatalogComponent,
    PopupComponent,
    CategoryComponent,
    CategoryComponent,
    TopicPickerComponent,
    LayerManagerComponent,
    LayerInformationComponent,
    LayerPresentationComponent,
    MapClickComponent,
    TimeBehaviorComponent,
    TextFieldComponent,
    UrlFieldComponent,
    DateFieldComponent,
    ImageFieldComponent,
  ]
})

export class MapModule {
}