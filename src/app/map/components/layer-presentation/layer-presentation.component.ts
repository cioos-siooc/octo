/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import { ClientPresentation, Layer } from '@app/shared/models';
import * as layerActions from '@app/map/store/actions/layer.actions';
import {MapState, selectLayerById} from '@app/map/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-layer-presentation',
  templateUrl: './layer-presentation.component.html',
  styleUrls: ['./layer-presentation.component.css']
})
export class LayerPresentationComponent implements OnInit, OnDestroy {
  @Input() layerId: number;
  layerSubscription: Subscription;

  clientPresentations: ClientPresentation[];
  currentClientPresentation: ClientPresentation;

  constructor(private store: Store<MapState>) {
  }

  ngOnInit() {
    this.layerSubscription = this.store.select(selectLayerById(this.layerId)).subscribe(layer => {
      this.currentClientPresentation = layer.currentClientPresentation;
      this.clientPresentations = layer.clientPresentations;
    });
  }

  ngOnDestroy() {
    this.layerSubscription.unsubscribe();
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
