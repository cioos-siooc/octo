/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {CatalogComponent} from '@app/map/components/catalog/catalog.component';
import {CategoryComponent} from '@app/map/components/catalog/category/category.component';
import {EnumBehaviorComponent} from '@app/map/components/enum-behavior/enum-behavior.component';
import {LayerInformationComponent} from '@app/map/components/layer-information/layer-information.component';
import {LayerManagerComponent} from '@app/map/components/layer-manager/layer-manager.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import {TimeBehaviorComponent} from '@app/map/components/time-behavior/time-behavior.component';
import {LayerPresentationComponent} from '@app/map/components/layer-presentation/layer-presentation.component';
import {MapComponent} from '@app/map/components/map/map.component';
import {MapClickComponent} from '@app/map/components/map-click/map-click.component';
import {ImageFieldComponent} from '@app/map/components/map-click/click-formatter/field/image-field/image-field.component';
import {DateFieldComponent} from '@app/map/components/map-click/click-formatter/field/date-field/date-field.component';
import {TextFieldComponent} from '@app/map/components/map-click/click-formatter/field/text-field/text-field.component';
import {UrlFieldComponent} from '@app/map/components/map-click/click-formatter/field/url-field/url-field.component';
import {OpenLayersComponent} from '@app/map/components/open-layers/open-layers.component';
import {TopicPickerComponent} from '@app/map/components/topic-picker/topic-picker.component';
import { TimeSliderComponent } from './time-slider/time-slider.component';

export const components: any[] = [
  CatalogComponent,
  CategoryComponent,
  EnumBehaviorComponent,
  LayerInformationComponent,
  LayerManagerComponent,
  TimeBehaviorComponent,
  LayerPresentationComponent,
  MapComponent,
  MapClickComponent,
  ImageFieldComponent,
  DateFieldComponent,
  TextFieldComponent,
  UrlFieldComponent,
  OpenLayersComponent,
  TopicPickerComponent,
  TimeSliderComponent,
  LoadingIndicatorComponent
];

export * from './catalog/catalog.component';
export * from './catalog/category/category.component';
export * from './enum-behavior/enum-behavior.component';
export * from './layer-information/layer-information.component';
export * from './layer-manager/layer-manager.component';
export * from './loading-indicator/loading-indicator.component';
export * from './time-behavior/time-behavior.component';
export * from './layer-presentation/layer-presentation.component';
export * from './map/map.component';
export * from './map-click/map-click.component';
export * from './map-click/click-formatter/field/image-field/image-field.component';
export * from './map-click/click-formatter/field/date-field/date-field.component';
export * from './map-click/click-formatter/field/text-field/text-field.component';
export * from './map-click/click-formatter/field/url-field/url-field.component';
export * from './open-layers/open-layers.component';
export * from './topic-picker/topic-picker.component';
export * from './time-slider/time-slider.component';
