import {Component, HostBinding, OnInit} from '@angular/core';
import * as fromApp from '../store/app.reducers';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Layer} from '../shared/layer.model';
import {cloneDeep} from 'lodash';


import * as fromBaseLayer from './store/base-layer.reducers';
import * as fromMapClick from './components/map-click/store/map-click.reducers';
import * as baseLayerActions from './store/base-layer.actions';
import * as popupActions from './store/popup.actions';
import {environment} from '../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import * as catalogActions from './components/catalog/store/catalog.actions';
import {UrlBehaviorService} from './components/layer-manager/url-behavior.service';
import {filter, first, take} from 'rxjs/operators';

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

  constructor(private translateService: TranslateService, private store: Store<fromApp.AppState>,
              private urlBehaviorService: UrlBehaviorService) {
  }

  ngOnInit() {
    this.synchronizeBaseLayer();
    this.baseLayers = this.store.pipe(select(fromApp.selectAllBaseLayers));
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

  private initMapClickTitle() {
    this.store.select('mapClick').subscribe((mapClickState: fromMapClick.State) => {
      const mapClickClonedState = cloneDeep(mapClickState);
      if (mapClickClonedState.mapClickLayer != null) {
        this.mapClickTitle = mapClickClonedState.mapClickLayer.title;
      }
    });
  }

  private applicationUsesDefaultTopic() {
    return !this.environment.isTopicPickerActive;
  }

  private synchronizeBaseLayer() {
    this.store.select('baseLayer').pipe(first((baseLayerState: fromBaseLayer.State) => {
      return baseLayerState.currentBaseLayer != null;
    })).subscribe((baseLayerState: fromBaseLayer.State) => {
      const clonedBaseLayerState = cloneDeep(baseLayerState);
      this.currentBaseLayer = clonedBaseLayerState.currentBaseLayer;
    });
  }

  private initPopups() {
    this.store.dispatch(new popupActions.AddPopup({id: this.CATALOG_POPUP_ID, isOpen: false}));
    this.store.dispatch(new popupActions.AddPopup({id: this.TOPIC_PICKER_POPUP_ID, isOpen: false}));
    this.store.dispatch(new popupActions.AddPopup({id: this.LAYER_MANAGER_POPUP_ID, isOpen: false}));
    this.store.dispatch(new popupActions.AddPopup({id: this.LAYER_INFORMATION_POPUP_ID, isOpen: false}));
    this.store.dispatch(new popupActions.AddPopup({id: this.LAYER_PRESENTATION_POPUP_ID, isOpen: false}));
    this.store.dispatch(new popupActions.AddPopup({id: this.MAP_CLICK_POPUP_ID, isOpen: false}));
  }

  /**
   * If there is no current topic, initialize the current topic
   */
  private initializeTopic() {
    this.store.select('catalog').pipe(take(1)).subscribe((currentState) => {
      if (currentState.topics.length === 0) {
        this.translateService.get('language').subscribe((lang) => {
          this.store.dispatch(new catalogActions.FetchTopicForCode({
            languageCode: lang,
            code: environment.defaultTopic
          }));
          this.store.select('catalog').pipe(filter((state) => {
            return state.topics.length > 0;
          }), take(1)).subscribe(() => {
            this.store.dispatch(new catalogActions.SetTopicExpanded({topicIndex: 0, expanded: true}));
          });
        });
      }
    });
  }
}
