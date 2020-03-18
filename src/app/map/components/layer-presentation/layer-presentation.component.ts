/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, OnInit, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ClientPresentation} from '@app/shared/models';
import * as layerActions from '@app/map/store/actions/layer.actions';
import {cloneDeep} from 'lodash';
import {MapState, selectLayerById} from '@app/map/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-layer-presentation',
  templateUrl: './layer-presentation.component.html',
  styleUrls: ['./layer-presentation.component.css']
})
export class LayerPresentationComponent implements OnInit {
  @Input() layerId: number;

  clientPresentations: ClientPresentation[];
  currentClientPresentation: ClientPresentation;

  private currentUniqueId: string;

  constructor(private store: Store<MapState>) {
  }

  ngOnInit() {
    this.store.select(selectLayerById(this.layerId)).subscribe(layer => {
      this.currentClientPresentation = layer.currentClientPresentation;
      this.clientPresentations = layer.clientPresentations;
    });
  }

  onSelectClientPresentation() {
    this.store.dispatch(new layerActions.SetClientPresentation({
      layerId: this.layerId,
      clientPresentation: this.currentClientPresentation
    }));
  }

  compareClientPresentations(cp1: ClientPresentation, cp2: ClientPresentation) {
    return cp1 && cp2 ? cp1.id === cp2.id : cp1 === cp2;
  }

}
