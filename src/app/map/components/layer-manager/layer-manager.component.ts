/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as layerActions from '@app/map/store/actions/layer.actions';
import * as layerInformationActions from '@app/map/store/actions/layer-information.actions';
import * as catalogActions from '@app/map/store/actions/catalog.actions';
import * as popupActions from '@app/map/store/actions/popup.actions';
import {LAYER_INFORMATION_POPUP_ID, LAYER_PRESENTATION_POPUP_ID} from '../map/map.component';
import * as layerPresentationActions from '@app/map/store/actions/layer-presentation.actions';
import {TranslateService} from '@ngx-translate/core';
import {isEqual} from 'lodash';
import {map, take} from 'rxjs/operators';
import {MapState} from '@app/map/store';
import {selectBehaviorState} from '@app/map/store/selectors/behavior.selectors';
import {selectLayerState} from '@app/map/store/selectors/layer.selectors';

@Component({
  selector: 'app-layer-manager',
  templateUrl: './layer-manager.component.html',
  styleUrls: ['./layer-manager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayerManagerComponent implements OnInit {
  layerIds = [];
  expandedLayerIds = [];

  constructor(private store: Store<MapState>, private translateService: TranslateService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.store.select(selectLayerState).subscribe((layerState) => {
      const layerUniqueIds = layerState.layers.map(l => l.uniqueId);
      if (!isEqual(this.layerIds, layerUniqueIds)) {
        this.layerIds = layerUniqueIds;
        this.changeDetector.markForCheck();
      }
    });
  }

  getLayerTitle(layerUniqueId) {
    return this.store.select(selectLayerState).pipe(take(1), map((layerState) => {
      const layer = layerState.layers.find(l => l.uniqueId === layerUniqueId);
      return layer.title;
    }));
  }

  // TODO: store behaviors in local variable instead, so getUrlBehaviors is not called multiple times uselessly
  getUrlBehaviors(layerUniqueId) {
    return this.store.select(selectBehaviorState).pipe(take(1), map((behaviorState) => {
      return behaviorState.behaviors.filter((b) => {
        return b.layerUniqueId === layerUniqueId;
      });
    }));
  }

  onRemoveClick(layerUniqueId) {
    this.store.dispatch(new layerActions.DeleteLayer(layerUniqueId));
    this.store.dispatch(new catalogActions.RemoveSelectedLayer(layerUniqueId));
  }

  onShowLayerInfoClick(layerUniqueId) {
    this.store.select(selectLayerState).pipe(take(1)).subscribe((layerState) => {
      const layer = layerState.layers.find(l => l.uniqueId === layerUniqueId);
      this.store.dispatch(new layerInformationActions.SetSelectedLayerId(layer.id));
      this.store.dispatch(new popupActions.SetIsOpen({popupId: LAYER_INFORMATION_POPUP_ID, isOpen: true}));
    });
  }

  onShowLayerPresentation(layerUniqueId) {
    this.store.select(selectLayerState).pipe(take(1)).subscribe((layerState) => {
      const layer = layerState.layers.find(l => l.uniqueId === layerUniqueId);
      this.store.dispatch(new layerPresentationActions.SetLayerUniqueId(layerUniqueId));
      this.store.dispatch(new layerPresentationActions.SetClientPresentations(layer.clientPresentations));
      this.store.dispatch(new layerPresentationActions.SetCurrentClientPresentation(layer.currentClientPresentation));
      this.store.dispatch(new popupActions.SetIsOpen({popupId: LAYER_PRESENTATION_POPUP_ID, isOpen: true}));
    });
  }

  onMoveUpLayerClick(layerUniqueId) {
    this.store.dispatch(new layerActions.MoveUpLayer(layerUniqueId));
  }

  onMoveDownLayerClick(layerUniqueId) {
    this.store.dispatch(new layerActions.MoveDownLayer(layerUniqueId));
  }

  onExpandSettingsClick(layerUniqueId) {
    if (this.isSettingsExpanded(layerUniqueId)) {
      this.expandedLayerIds = this.expandedLayerIds.filter(id => id !== layerUniqueId);
    } else {
      this.expandedLayerIds.push(layerUniqueId);
    }
  }

  isSettingsExpanded(layerUniqueId) {
    return this.expandedLayerIds.some(id => id === layerUniqueId);
  }
}
