import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromLayer from '../map/store/layer.reducers';
import {Observable} from 'rxjs/Observable';
import * as layerActions from '../map/store/layer.actions';
import * as layerInformationActions from '../layer-information/store/layer-information.actions';
import * as catalogActions from '../catalog/store/catalog.actions';
import {Layer} from '../shared/layer.model';

@Component({
  selector: 'app-layer-manager',
  templateUrl: './layer-manager.component.html',
  styleUrls: ['./layer-manager.component.css']
})
export class LayerManagerComponent implements OnInit {
  layerState: Observable<fromLayer.State>;
  showLayerInformation: boolean;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.layerState = this.store.select('layer');
    this.showLayerInformation = false;
  }

  onRemoveClick(layer) {
    this.store.dispatch(new layerActions.DeleteLayer(layer.uniqueId));
    this.store.dispatch(new catalogActions.RemoveSelectedLayer(layer.uniqueId));
  }

  onShowLayerInfoClick(layer: Layer) {
    this.store.dispatch(new layerInformationActions.SetSelectedLayerId(layer.id));
    this.showLayerInformation = true;
  }

}
