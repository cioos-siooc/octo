import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as fromLayerInformation from './store/layer-information.reducers';
import * as fromApp from '../store/app.reducers';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-layer-information',
  templateUrl: './layer-information.component.html',
  styleUrls: ['./layer-information.component.css']
})
export class LayerInformationComponent implements OnInit {
  layerInformationState: Observable<fromLayerInformation.State>;
  layerInformationHtml: string;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.layerInformationState = this.store.select('layerInformation');
    this.layerInformationState.subscribe((state) => this.layerInformationHtml = state.informationHtml);
  }

}
