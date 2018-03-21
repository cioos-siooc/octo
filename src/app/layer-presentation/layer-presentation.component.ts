import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromLayerPresentation from './store/layer-presentation.reducers';
import {Observable} from 'rxjs/Observable';
import {ClientPresentation} from '../shared/client-presentation.model';
import * as layerPresentationActions from './store/layer-presentation.actions';

@Component({
  selector: 'app-layer-presentation',
  templateUrl: './layer-presentation.component.html',
  styleUrls: ['./layer-presentation.component.css']
})
export class LayerPresentationComponent implements OnInit {
  layerPresentationState: Observable<fromLayerPresentation.State>;
  currentClientPresentation: ClientPresentation;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.layerPresentationState = this.store.select('layerPresentation');
    this.store.select('layerPresentation').subscribe((state) => {
      this.currentClientPresentation = state.currentClientPresentation;
    });
  }

  onSelectClientPresentation() {
    this.store.dispatch(new layerPresentationActions.SetCurrentClientPresentation(this.currentClientPresentation));
    // TODO: update the layerReducer to change the currentClientPresentation of the current layer
  }

}
