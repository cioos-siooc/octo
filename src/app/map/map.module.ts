/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../shared/shared.module';
import {CalendarModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {mapReducers} from './store';
import { BehaviorEffects, CategoryEffects,
         TopicEffects, LayerEffects, LayerInformationEffects, TimeEffects } from '@app/map/store/effects';
import * as fromComponents from './components';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayerPickerComponent } from './components/layer-picker/layer-picker.component';
import { LayerComponent } from './components/layer-manager/layer/layer.component';
import { LayerGroupComponent } from './components/layer-manager/layer-group/layer-group.component';
import { AngularResizedEventModule } from 'angular-resize-event';
import {LayerConfigurationComponent} from '@app/map/components/layer-configuration/layer-configuration.component';
import { NgDragDropModule } from 'ng-drag-drop';
import { StylerService } from './utils/open-layers/styler.service';
import { OLLayerFactory } from './utils';
import { MapService } from '@app/map/utils/open-layers';
import { DynamicEnumBehaviorComponent } from './components/dynamic-enum-behavior/dynamic-enum-behavior.component';
import { BehaviorHandlerFactory } from '@app/map/utils';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';

@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    CalendarModule,
    NgDragDropModule.forRoot(),
    StoreModule.forFeature('map', mapReducers),
    EffectsModule.forFeature([BehaviorEffects, LayerEffects, CategoryEffects, TopicEffects, LayerInformationEffects, TimeEffects]),
    NgbModule.forRoot(),
    AngularResizedEventModule,
  ],
  declarations: [
    ...fromComponents.components,
    SidebarComponent,
    LayerPickerComponent,
    LayerComponent,
    LayerGroupComponent,
    LayerConfigurationComponent,
    DynamicEnumBehaviorComponent,
    LoadingIndicatorComponent,
  ],
  providers: [
    StylerService,
    OLLayerFactory,
    BehaviorHandlerFactory,
    MapService
  ]
})

export class MapModule {
}
