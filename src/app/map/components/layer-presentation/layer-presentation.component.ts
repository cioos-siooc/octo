import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as fromLayerPresentation from '../../store/reducers/layer-presentation.reducers';
import {Observable} from 'rxjs';
import {ClientPresentation} from '../../../shared/client-presentation.model';
import * as layerPresentationActions from '../../store/actions/layer-presentation.actions';
import * as layerActions from '../../store/actions/layer.actions';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-layer-presentation',
  templateUrl: './layer-presentation.component.html',
  styleUrls: ['./layer-presentation.component.css']
})
export class LayerPresentationComponent implements OnInit {
  layerPresentationState: Observable<fromLayerPresentation.State>;
  currentClientPresentation: ClientPresentation;
  private currentUniqueId: string;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.layerPresentationState = this.store.select('layerPresentation');
    this.store.select('layerPresentation').subscribe((state) => {
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
