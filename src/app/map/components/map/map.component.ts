/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, HostBinding, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Layer} from '@app/shared/models';
import {cloneDeep} from 'lodash';
import {Location} from '@angular/common';

import { selectBehaviorMode } from './../../store/selectors/behavior.selectors';
import { BehaviorState } from './../../store/reducers/behavior.reducers';
import { UpdateMode } from './../../store/actions/behavior.actions';
import * as fromBaseLayer from '@app/map/store/reducers/base-layer.reducers';
import * as fromMapClick from '@app/map/store/reducers/map-click.reducers';
import * as fromLayer from '@app/map/store/reducers/layer.reducers';
import * as layerActions from '@app/map/store/actions/layer.actions';
import * as baseLayerActions from '@app/map/store/actions/base-layer.actions';
import {environment} from '@env/environment';
import {TranslateService} from '@ngx-translate/core';
import {UrlBehaviorService} from '@app/map/services';
import {first, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { sortlayerPriorityDescending } from '@app/shared/utils';
import {MapState, selectLayerState, selectMapClickState, selectBehaviorState} from '@app/map/store';
import {selectAllBaseLayers, selectBaseLayerState} from '@app/map/store/selectors/base-layer.selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { displayMode } from './map.types';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css', './map-responsive.component.css'],
})
export class MapComponent implements OnInit {
  @HostBinding('class') class = 'full-sized';
  baseLayers: Observable<Layer[]>;
  currentBaseLayer: Layer;
  environment = environment;
  mapClickTitle: string;
  displayMode: displayMode;

  constructor(private httpClient: HttpClient, private translateService: TranslateService,
              private store: Store<MapState>, private urlBehaviorService: UrlBehaviorService,
              private location: Location, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.displayMode = displayMode.full;
    this.initBaseLayers();
    this.baseLayers = this.store.pipe(select(selectAllBaseLayers));
    if (environment.unremovableLayerCode !== '') {
      this.initUnremovableLayer();
    }
    if (this.applicationUsesDefaultTopic()) {
      // this.initializeTopic();
    }
    // Check the URL for parameters and initialize layers as necessary
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      if ('layers' in params) {
        const layers = params.layers.split(',');
        for (let i = 0; i < layers.length; i++) {
          const layer = layers[i];
          this.store.dispatch(new layerActions.FetchLayer({
            layerId: layer,
            priority: layers.length - i
          }));
        }
      }
    });
    // Listen for newly added layers and add them to the URL
    this.store.select(selectLayerState).subscribe((state: fromLayer.LayerState) => {
      const layers = state.layers.slice();
      const layerIds = layers.sort(sortlayerPriorityDescending).filter(
        // Filter layer list to make sure layerGroup members aren't added to the URL
        layer => typeof(layer.layerGroupId) === 'undefined' && !(layer.isUnremovable)
      ).map(
        // Extract a list of layerIds to add to URL
        // Makes shareable links
        layer => layer.id
      );

      if (layerIds.length > 0) {
        this.router.navigate([], {
          queryParams: {'layers': layerIds.toString()},
          queryParamsHandling: 'merge',
        });
      } else {
        this.router.navigate([], {
          queryParams: {'layers': null},
          queryParamsHandling: 'merge',
        });
      }
    });
    this.store.select(selectBehaviorMode).subscribe((isSync: boolean) => {
      if (isSync) {
        this.displayMode = displayMode.timeslider;
      } else {
        this.displayMode = displayMode.full;
      }
    });
  }

  compareBaseLayers(baseLayer1: Layer, baseLayer2: Layer) {
    return baseLayer1 && baseLayer2 ? baseLayer1.id === baseLayer2.id : baseLayer1 === baseLayer2;
  }

  onSelectBaseLayer() {
    this.store.dispatch(new baseLayerActions.SetCurrentBaseLayer(this.currentBaseLayer));
  }

  private initBaseLayers() {
    this.store.select(selectBaseLayerState).pipe(take(1)).subscribe((baseLayerState: fromBaseLayer.BaseLayerState) => {
      if (baseLayerState.currentBaseLayer == null) {
        this.populateBaseLayers();
      }
    });
    this.synchronizeBaseLayer();
  }

  private populateBaseLayers() {
    for (const code of environment.backgroundLayerCodes) {
      this.translateService.get('language').pipe(take(1)).subscribe((lang) => {
        // TODO: move http  base layers retrieval into service or effect?
        this.httpClient.get<Layer>(`${environment.mapapiUrl}/layers/getLayerForCode?` +
          `code=${code}&language-code=${lang}`)
          .subscribe((layer: Layer) => {
            this.store.dispatch(new baseLayerActions.AddBaseLayer(layer));
            if (layer.code === 'bing.aerial') {
              this.store.dispatch(new baseLayerActions.SetCurrentBaseLayer(layer));
            }
          });
      });
    }
  }

  private initUnremovableLayer() {
    // if there's an unremovable layer defined in environment.ts, we add it to the map
    this.store.dispatch(new layerActions.FetchLayer({
      layerCode: environment.unremovableLayerCode,
      isUnremovable: true,
    }));
  }

  private applicationUsesDefaultTopic() {
    return !this.environment.isTopicPickerActive;
  }

  private synchronizeBaseLayer() {
    this.store.select(selectBaseLayerState).pipe(first((baseLayerState: fromBaseLayer.BaseLayerState) => {
      return baseLayerState.currentBaseLayer != null;
    })).subscribe((baseLayerState: fromBaseLayer.BaseLayerState) => {
      const clonedBaseLayerState = cloneDeep(baseLayerState);
      this.currentBaseLayer = clonedBaseLayerState.currentBaseLayer;
    });
  }

}
