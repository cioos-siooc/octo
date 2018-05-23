import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import * as fromLayerInformation from '../../store/reducers/layer-information.reducers';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducers';

@Component({
  selector: 'app-layer-information',
  templateUrl: './layer-information.component.html',
  styleUrls: ['./layer-information.component.css']
})
export class LayerInformationComponent implements OnInit {
  layerInformationState: Observable<fromLayerInformation.State>;
  layerInformationHtml: string;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.layerInformationState = this.store.select('layerInformation');
    this.layerInformationState.subscribe((state) => this.layerInformationHtml = state.informationHtml);
  }

}
