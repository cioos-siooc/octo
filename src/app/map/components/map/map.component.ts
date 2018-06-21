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


import * as fromBaseLayer from '@app/map/store/reducers/base-layer.reducers';
import * as fromMapClick from '@app/map/store/reducers/map-click.reducers';
import * as fromLayer from '@app/map/store/reducers/layer.reducers';
import * as baseLayerActions from '@app/map/store/actions/base-layer.actions';
import * as popupActions from '@app/map/store/actions/popup.actions';
import {environment} from '@env/environment';
import {TranslateService} from '@ngx-translate/core';
import * as catalogActions from '@app/map/store/actions/catalog.actions';
import {UrlBehaviorService} from '@app/map/services';
import {filter, first, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MapState, selectCatalogState, selectLayerState, selectMapClickState} from '@app/map/store';
import {selectAllBaseLayers, selectBaseLayerState} from '@app/map/store/selectors/base-layer.selectors';

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
              private store: Store<MapState>, private urlBehaviorService: UrlBehaviorService) {
  }

  ngOnInit() {
    this.initBaseLayers();
    this.baseLayers = this.store.pipe(select(selectAllBaseLayers));
    this.initPopups();
    this.initMapClickTitle();
    if (this.applicationUsesDefaultTopic()) {
      this.initializeTopic();
    }
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
      this.translateService.get('language').subscribe((lang) => {
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

  private initMapClickTitle() {
    this.store.select(selectMapClickState).subscribe((mapClickState: fromMapClick.MapClickState) => {
      const mapClickClonedState = cloneDeep(mapClickState);
      if (mapClickClonedState.mapClickLayerUniqueId != null) {
        this.store.select(selectLayerState).pipe(take(1)).subscribe((layerState: fromLayer.LayerState) => {
          const clickResultLayer = layerState.layers
            .find(l => l.uniqueId === mapClickClonedState.mapClickLayerUniqueId);
          if (clickResultLayer != null) {
            this.mapClickTitle = clickResultLayer.title;
          }
        });
      }
    });
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

  private initPopups() {
    this.store.dispatch(new popupActions.AddPopup({id: this.CATALOG_POPUP_ID, isOpen: true}));
    this.store.dispatch(new popupActions.AddPopup({id: this.TOPIC_PICKER_POPUP_ID, isOpen: true}));
    this.store.dispatch(new popupActions.AddPopup({id: this.LAYER_MANAGER_POPUP_ID, isOpen: true}));
    this.store.dispatch(new popupActions.AddPopup({id: this.LAYER_INFORMATION_POPUP_ID, isOpen: false}));
    this.store.dispatch(new popupActions.AddPopup({id: this.LAYER_PRESENTATION_POPUP_ID, isOpen: false}));
    this.store.dispatch(new popupActions.AddPopup({id: this.MAP_CLICK_POPUP_ID, isOpen: false}));
  }

  /**
   * If there is no current topic, initialize the current topic
   */
  private initializeTopic() {
    this.store.select(selectCatalogState).pipe(take(1)).subscribe((currentState) => {
      if (currentState.topics.length === 0) {
        this.translateService.get('language').subscribe((lang) => {
          this.store.dispatch(new catalogActions.FetchTopicForCode({
            languageCode: lang,
            code: environment.defaultTopic
          }));
          this.store.select(selectCatalogState).pipe(filter((state) => {
            return state.topics.length > 0;
          }), take(1)).subscribe(() => {
            this.store.dispatch(new catalogActions.SetTopicExpanded({topicIndex: 0, expanded: true}));
          });
        });
      }
    });
  }
}
