import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromLayerPresentation from '../../store/reducers/layer-presentation.reducers';
import {Observable} from 'rxjs';
import {ClientPresentation} from '../../../shared/models/client-presentation.model';
import * as layerPresentationActions from '../../store/actions/layer-presentation.actions';
import * as layerActions from '../../store/actions/layer.actions';
import {cloneDeep} from 'lodash';
import {MapState, selectLayerPresentationState} from '../../store/reducers/map.reducers';

@Component({
  selector: 'app-layer-presentation',
  templateUrl: './layer-presentation.component.html',
  styleUrls: ['./layer-presentation.component.css']
})
export class LayerPresentationComponent implements OnInit {
  layerPresentationState: Observable<fromLayerPresentation.State>;
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
