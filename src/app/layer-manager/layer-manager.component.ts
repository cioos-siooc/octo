import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromLayer from '../map/store/layer.reducers';
import {Observable} from 'rxjs/Observable';
import * as layerActions from '../map/store/layer.actions';
import * as layerInformationActions from '../layer-information/store/layer-information.actions';
import * as catalogActions from '../catalog/store/catalog.actions';
import {Layer} from '../shared/layer.model';
import * as popupActions from '../map/store/popup.actions';
import {LAYER_INFORMATION_POPUP_ID, LAYER_PRESENTATION_POPUP_ID} from '../map/map.component';
import * as layerPresentationActions from '../layer-presentation/store/layer-presentation.actions';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-layer-manager',
  templateUrl: './layer-manager.component.html',
  styleUrls: ['./layer-manager.component.css']
})
export class LayerManagerComponent implements OnInit {
  layerState: Observable<fromLayer.State>;


  constructor(private store: Store<fromApp.AppState>, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.layerState = this.store.select('layer');
  }

  onRemoveClick(layer) {
    this.store.dispatch(new layerActions.DeleteLayer(layer.uniqueId));
    this.store.dispatch(new catalogActions.RemoveSelectedLayer(layer.uniqueId));
  }

  onShowLayerInfoClick(layer: Layer) {
    this.store.dispatch(new layerInformationActions.SetSelectedLayerId(layer.id));
    this.store.dispatch(new popupActions.SetIsOpen({popupId: LAYER_INFORMATION_POPUP_ID, isOpen: true}));
  }

  onShowLayerPresentation(layer: Layer) {
    this.store.dispatch(new layerPresentationActions.SetLayerUniqueId(layer.uniqueId));
    this.store.dispatch(new layerPresentationActions.SetClientPresentations(layer.clientPresentations));
    this.store.dispatch(new layerPresentationActions.SetCurrentClientPresentation(layer.currentClientPresentation));
    this.store.dispatch(new popupActions.SetIsOpen({popupId: LAYER_PRESENTATION_POPUP_ID, isOpen: true}));
  }

  onMoveUpLayerClick(layer: Layer) {
    this.store.dispatch(new layerActions.MoveUpLayer(layer.uniqueId));
  }

  onMoveDownLayerClick(layer: Layer) {
    this.store.dispatch(new layerActions.MoveDownLayer(layer.uniqueId));
  }

  onExpandSettingsClick(layer) {
    layer.isSettingsExpanded = !layer.isSettingsExpanded;
  }
}
