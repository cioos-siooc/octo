import { Component, OnInit } from '@angular/core';
import * as fromApp from '../store/app.reducers';
import {Store} from '@ngrx/store';
import * as layerActions from '../map/store/layer.actions'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  host: {
    class: 'fill-area'
  }
})
export class MapComponent implements OnInit {

  constructor(private store : Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new layerActions.FetchLayer(357));
    this.store.dispatch(new layerActions.FetchLayer(358));
  }
}
