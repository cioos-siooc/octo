import {Component, HostBinding, OnInit} from '@angular/core';
import * as fromApp from '../store/app.reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Layer} from '../shared/layer.model';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import * as fromBaseLayer from './store/base-layer.reducers';
import * as baseLayerActions from './store/base-layer.actions';
import * as popupActions from './store/popup.actions';

export const CATALOG_POPUP_ID = 'CATALOG';
export const LAYER_MANAGER_POPUP_ID = 'LAYER_MANAGER';
export const LAYER_INFORMATION_POPUP_ID = 'LAYER_INFORMATION';
export const TOPIC_PICKER_POPUP_ID = 'TOPIC_PICKER';
export const LEGEND_POPUP_ID = 'LEGEND';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @HostBinding('class') class = 'full-sized';
  layerState: Observable<fromBaseLayer.State>;
  currentBaseLayer: Layer;
  CATALOG_POPUP_ID = CATALOG_POPUP_ID;
  LAYER_MANAGER_POPUP_ID = LAYER_MANAGER_POPUP_ID;
  LAYER_INFORMATION_POPUP_ID = LAYER_INFORMATION_POPUP_ID;
  TOPIC_PICKER_POPUP_ID = TOPIC_PICKER_POPUP_ID;
  LEGEND_POPUP_ID = LEGEND_POPUP_ID;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.synchronizeBaseLayer();
    this.layerState = this.store.select('baseLayer');
    this.initPopups();
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

  private synchronizeBaseLayer() {
    this.store.select('baseLayer').first((baseLayerState: fromBaseLayer.State) => {
      return baseLayerState.currentBaseLayer != null;
    }).subscribe((baseLayerState: fromBaseLayer.State) => {
      this.currentBaseLayer = baseLayerState.currentBaseLayer;
    });
  }

  private initPopups() {
    this.store.dispatch(new popupActions.AddPopup({id: this.CATALOG_POPUP_ID, isOpen: false}));
    this.store.dispatch(new popupActions.AddPopup({id: this.TOPIC_PICKER_POPUP_ID, isOpen: false}));
    this.store.dispatch(new popupActions.AddPopup({id: this.LAYER_MANAGER_POPUP_ID, isOpen: false}));
  }
}
