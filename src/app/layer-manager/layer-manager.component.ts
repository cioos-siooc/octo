import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import 'rxjs/operator/mapTo';
import * as fromApp from '../store/app.reducers';
import * as layerActions from '../map/store/layer.actions';
import * as layerInformationActions from '../layer-information/store/layer-information.actions';
import * as catalogActions from '../catalog/store/catalog.actions';
import * as popupActions from '../map/store/popup.actions';
import {LAYER_INFORMATION_POPUP_ID, LAYER_PRESENTATION_POPUP_ID} from '../map/map.component';
import * as layerPresentationActions from '../layer-presentation/store/layer-presentation.actions';
import {TranslateService} from '@ngx-translate/core';
import {isEqual} from 'lodash';

@Component({
  selector: 'app-layer-manager',
  templateUrl: './layer-manager.component.html',
  styleUrls: ['./layer-manager.component.css']
})
export class LayerManagerComponent implements OnInit {
  layerIds = [];
  expandedLayerIds = [];


  constructor(private store: Store<fromApp.AppState>, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.store.select('layer').subscribe((layerState) => {
      const layerUniqueIds = layerState.layers.map(l => l.uniqueId);
      if (!isEqual(this.layerIds, layerUniqueIds)) {
        this.layerIds = layerUniqueIds;
      }
    });
  }

  testFunction(layerUniqueId) {
    return this.store.select('layer').take(1).map((layerState) => {
      const layer = layerState.layers.find(l => l.uniqueId === layerUniqueId);
      return layer.title;
    });
  }

  getUrlBehaviors(layerUniqueId) {
    return this.store.select('behavior').take(1).map((behaviorState) => {
      return behaviorState.behaviors.filter((b) => {
        return b.layerUniqueId === layerUniqueId;
      });
    });
  }

  onRemoveClick(layerUniqueId) {
    this.store.dispatch(new layerActions.DeleteLayer(layerUniqueId));
    this.store.dispatch(new catalogActions.RemoveSelectedLayer(layerUniqueId));
  }

  onShowLayerInfoClick(layerUniqueId) {
    this.store.select('layer').take(1).subscribe((layerState) => {
      const layer = layerState.layers.find(l => l.uniqueId = layerUniqueId);
      this.store.dispatch(new layerInformationActions.SetSelectedLayerId(layer.id));
      this.store.dispatch(new popupActions.SetIsOpen({popupId: LAYER_INFORMATION_POPUP_ID, isOpen: true}));
    });
  }

  onShowLayerPresentation(layerUniqueId) {
    this.store.select('layer').take(1).subscribe((layerState) => {
      const layer = layerState.layers.find(l => l.uniqueId = layerUniqueId);
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
    if (this.isLayerSettingsExpanded(layerUniqueId)) {
      this.expandedLayerIds = this.expandedLayerIds.filter(id => id !== layerUniqueId);
    } else {
      this.expandedLayerIds.push(layerUniqueId);
    }
  }

  isSettingsExpanded(layerUniqueId) {
    return this.isLayerSettingsExpanded(layerUniqueId);
  }

  private isLayerSettingsExpanded(layerUniqueId) {
    return this.expandedLayerIds.some(id => id === layerUniqueId);
  }
}
