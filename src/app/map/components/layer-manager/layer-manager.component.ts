import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as layerActions from '../../store/actions/layer.actions';
import * as layerInformationActions from '../../store/actions/layer-information.actions';
import * as catalogActions from '../../store/actions/catalog.actions';
import * as popupActions from '../../store/actions/popup.actions';
import {LAYER_INFORMATION_POPUP_ID, LAYER_PRESENTATION_POPUP_ID} from '../map/map.component';
import * as layerPresentationActions from '../../store/actions/layer-presentation.actions';
import {TranslateService} from '@ngx-translate/core';
import {cloneDeep, isEqual} from 'lodash';
import {map, take} from 'rxjs/operators';
import {MapState, selectBehaviorState, selectLayerState} from '../../store/reducers/map.reducers';

@Component({
  selector: 'app-layer-manager',
  templateUrl: './layer-manager.component.html',
  styleUrls: ['./layer-manager.component.css']
})
export class LayerManagerComponent implements OnInit {
  layerIds = [];
  expandedLayerIds = [];

  constructor(private store: Store<MapState>, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.store.select(selectLayerState).subscribe((layerState) => {
      const layerStateCopy = cloneDeep(layerState);
      const layerUniqueIds = layerStateCopy.layers.map(l => l.uniqueId);
      if (!isEqual(this.layerIds, layerUniqueIds)) {
        this.layerIds = layerUniqueIds;
      }
    });
  }

  getLayerTitle(layerUniqueId) {
    return this.store.select(selectLayerState).pipe(take(1), map((layerState) => {
      const layerStateCopy = cloneDeep(layerState);
      const layer = layerStateCopy.layers.find(l => l.uniqueId === layerUniqueId);
      return layer.title;
    }));
  }

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
