import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromLayer from '../map/store/layer.reducers';
import {Observable} from 'rxjs/Observable';
import * as layerActions from '../map/store/layer.actions';
@Component({
  selector: 'app-layer-manager',
  templateUrl: './layer-manager.component.html',
  styleUrls: ['./layer-manager.component.css']
})
export class LayerManagerComponent implements OnInit {
  layerState: Observable<fromLayer.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.layerState = this.store.select('layer');
  }

  onRemoveClick(layer) {
    this.store.dispatch(new layerActions.DeleteLayer(layer.uniqueId))
  }

}
