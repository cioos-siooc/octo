/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromLayerPresentation from '../../store/reducers/layer-presentation.reducers';
import {Observable} from 'rxjs';
import {ClientPresentation} from '@app/shared/models';
import * as layerPresentationActions from '@app/map/store/actions/layer-presentation.actions';
import * as layerActions from '@app/map/store/actions/layer.actions';
import {cloneDeep} from 'lodash';
import {MapState} from '@app/map/store';
import {selectLayerPresentationState} from '@app/map/store/selectors/layer-presentation.selectors';

@Component({
  selector: 'app-layer-presentation',
  templateUrl: './layer-presentation.component.html',
  styleUrls: ['./layer-presentation.component.css']
})
export class LayerPresentationComponent implements OnInit {
  layerPresentationState: Observable<fromLayerPresentation.LayerPresentationState>;
  currentClientPresentation: ClientPresentation;
  private currentUniqueId: string;

  constructor(private store: Store<MapState>) {
  }

  ngOnInit() {
    this.layerPresentationState = this.store.select(selectLayerPresentationState);
    this.store.select(selectLayerPresentationState).subscribe((state) => {
      const clonedState = cloneDeep(state);
      this.currentClientPresentation = clonedState.currentClientPresentation;
      this.currentUniqueId = clonedState.layerUniqueId;
    });
  }

  onSelectClientPresentation() {
    this.store.dispatch(new layerPresentationActions.SetCurrentClientPresentation(this.currentClientPresentation));
    this.store.dispatch(new layerActions.SetClientPresentation({
      uniqueId: this.currentUniqueId,
      clientPresentation: this.currentClientPresentation
    }));
  }

  compareClientPresentations(cp1: ClientPresentation, cp2: ClientPresentation) {
    return cp1 && cp2 ? cp1.id === cp2.id : cp1 === cp2;
  }

}
