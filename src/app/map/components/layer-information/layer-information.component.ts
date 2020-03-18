/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, OnInit, Input} from '@angular/core';

import {Store} from '@ngrx/store';
import {MapState, selectLayerInformationByLayerId} from '@app/map/store';
import { LayerInformation } from '@app/shared/models';

@Component({
  selector: 'app-layer-information',
  templateUrl: './layer-information.component.html',
  styleUrls: ['./layer-information.component.css']
})
export class LayerInformationComponent implements OnInit {
  @Input() layerId: Number;
  layerInformation?: LayerInformation;

  constructor(private store: Store<MapState>) {
  }

  ngOnInit() {
    this.store.select(selectLayerInformationByLayerId(this.layerId)).subscribe((layerInformation) => {
      this.layerInformation = layerInformation;
    });
  }

}
