import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromLayerPresentation from './store/layer-presentation.reducers';
import {Observable} from 'rxjs';
import {ClientPresentation} from '../shared/client-presentation.model';
import * as layerPresentationActions from './store/layer-presentation.actions';
import * as layerActions from '../map/store/layer.actions';

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
      this.currentClientPresentation = state.currentClientPresentation;
      this.currentUniqueId = state.layerUniqueId;
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
