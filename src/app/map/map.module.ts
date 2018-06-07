import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CalendarModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularDraggableModule} from 'angular2-draggable';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {mapReducers} from './store';
import {LayerInformationEffects} from './store/effects/layer-information.effects';
import {CatalogEffects} from './store/effects/catalog.effects';
import {LayerEffects} from './store/effects/layer.effects';
import * as fromComponents from './components';

@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    CalendarModule,
    AngularDraggableModule,
    StoreModule.forFeature('map', mapReducers),
    EffectsModule.forFeature([LayerEffects, CatalogEffects, LayerInformationEffects]),
  ],
  declarations: [...fromComponents.components]
})

export class MapModule {
}
