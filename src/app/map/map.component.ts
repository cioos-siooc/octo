import {Component, OnInit} from '@angular/core';
import * as fromApp from '../store/app.reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Layer} from '../shared/layer.model';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import * as fromBaseLayer from './store/base-layer.reducers';
import * as baseLayerActions from './store/base-layer.actions';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  host: {
    class: 'fill-area'
  }
})
export class MapComponent implements OnInit {
  layerState: Observable<fromBaseLayer.State>;
  currentBaseLayer: Layer;
  showCatalog: Boolean;
  showTopicPicker: Boolean;
  showLayerManager: Boolean;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.showCatalog = true;
    this.showTopicPicker = true;
    this.showLayerManager = true;

    this.store.select('baseLayer').first((baseLayerState: fromBaseLayer.State) => {
      return baseLayerState.currentBaseLayer != null;
    }).subscribe((baseLayerState: fromBaseLayer.State) => {
      this.currentBaseLayer = baseLayerState.currentBaseLayer;
    });
    this.layerState = this.store.select('baseLayer');
  }

  compareBaseLayers(baseLayer1: Layer, baseLayer2: Layer) {
    return baseLayer1 && baseLayer2 ? baseLayer1.id === baseLayer2.id : baseLayer1 === baseLayer2;
  }

  onSelectBaseLayer() {
    this.store.dispatch(new baseLayerActions.SetCurrentBaseLayer(this.currentBaseLayer));
  }

  toggleCatalog() {
    this.showCatalog = !this.showCatalog;
  }

  toggleTopicPicker() {
    this.showTopicPicker = !this.showTopicPicker;
  }

  toggleLayerManager() {
    this.showLayerManager = !this.showLayerManager;
  }
}
