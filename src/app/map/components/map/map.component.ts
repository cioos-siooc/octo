
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


import * as fromBaseLayer from '@app/map/store/reducers/base-layer.reducers';
import * as fromMapClick from '@app/map/store/reducers/map-click.reducers';
import * as fromLayer from '@app/map/store/reducers/layer.reducers';
import * as layerActions from '@app/map/store/actions/layer.actions';
import * as baseLayerActions from '@app/map/store/actions/base-layer.actions';
import * as popupActions from '@app/map/store/actions/popup.actions';
import {environment} from '@env/environment';
import {TranslateService} from '@ngx-translate/core';
import {UrlBehaviorService} from '@app/map/services';
import {first, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { sortlayerPriorityDescending } from '@app/shared/utils';
import {MapState, selectLayerState, selectMapClickState} from '@app/map/store';
import {selectAllBaseLayers, selectBaseLayerState} from '@app/map/store/selectors/base-layer.selectors';
import { Router, ActivatedRoute } from '@angular/router';

export const CATALOG_POPUP_ID = 'CATALOG';
export const LAYER_MANAGER_POPUP_ID = 'LAYER_MANAGER';
export const LAYER_INFORMATION_POPUP_ID = 'LAYER_INFORMATION';
export const TOPIC_PICKER_POPUP_ID = 'TOPIC_PICKER';
export const LAYER_PRESENTATION_POPUP_ID = 'LEGEND';
export const MAP_CLICK_POPUP_ID = 'MAP_CLICK';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css', './map-responsive.component.css'],
})
export class MapComponent implements OnInit {
  @HostBinding('class') class = 'full-sized';
  baseLayers: Observable<Layer[]>;
  currentBaseLayer: Layer;
  CATALOG_POPUP_ID = CATALOG_POPUP_ID;
  LAYER_MANAGER_POPUP_ID = LAYER_MANAGER_POPUP_ID;
  LAYER_INFORMATION_POPUP_ID = LAYER_INFORMATION_POPUP_ID;
  TOPIC_PICKER_POPUP_ID = TOPIC_PICKER_POPUP_ID;
  LAYER_PRESENTATION_POPUP_ID = LAYER_PRESENTATION_POPUP_ID;
  MAP_CLICK_POPUP_ID = MAP_CLICK_POPUP_ID;
  environment = environment;
  mapClickTitle: string;

  constructor(private httpClient: HttpClient, private translateService: TranslateService,
              private store: Store<MapState>, private urlBehaviorService: UrlBehaviorService,
              private location: Location, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.initBaseLayers();
    this.baseLayers = this.store.pipe(select(selectAllBaseLayers));
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
            uniqueId: layer.toString(),
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
        layer => typeof(layer.layerGroupId) === 'undefined'
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
  }

  compareBaseLayers(baseLayer1: Layer, baseLayer2: Layer) {
    return baseLayer1 && baseLayer2 ? baseLayer1.id === baseLayer2.id : baseLayer1 === baseLayer2;
  }

  onSelectBaseLayer() {
    this.store.dispatch(new baseLayerActions.SetCurrentBaseLayer(this.currentBaseLayer));
  }

  toggleCatalog() {
    this.store.dispatch(new popupActions.TogglePopup(this.CATALOG_POPUP_ID));
  }

  toggleTopicPicker() {
    this.store.dispatch(new popupActions.TogglePopup(this.TOPIC_PICKER_POPUP_ID));
  }

  toggleLayerManager() {
    this.store.dispatch(new popupActions.TogglePopup(this.LAYER_MANAGER_POPUP_ID));
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
