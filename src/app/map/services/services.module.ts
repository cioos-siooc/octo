import { LoadingService } from '@app/map/services';
import { MapService } from '@app/map/utils/open-layers';
import { OLLayerFactory, BehaviorHandlerFactory } from '@app/map/utils';
import { StylerService } from './../utils/open-layers/styler.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    StylerService,
    OLLayerFactory,
    BehaviorHandlerFactory,
    MapService,
    LoadingService
  ]
})
export class ServicesModule {
 }
