import { MapClickInfo } from './../../../shared/models/map-click-info.model';
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, OnInit, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {cloneDeep} from 'lodash';
import {MapState} from '@app/map/store';
import * as fromMapClick from '@app/map/store/reducers/map-click.reducers';
import {selectMapClickState, selectMapClickByLayerId} from '@app/map/store/selectors/map-click.selectors';
import { Layer } from '@app/shared/models';

@Component({
  selector: 'app-map-click',
  templateUrl: './map-click.component.html',
  styleUrls: ['./map-click.component.css']
})
export class MapClickComponent implements OnInit {
  @Input() layer: Layer;
  mapClickInfo: MapClickInfo;

  constructor(private store: Store<MapState>) {
  }

  ngOnInit() {
    this.store.select(selectMapClickState).subscribe(
      (mapClickState: fromMapClick.MapClickState) => {
        if (this.layer.id in mapClickState.entities) {
          this.mapClickInfo = mapClickState.entities[this.layer.id];
        }
      }
    );
  }

}
