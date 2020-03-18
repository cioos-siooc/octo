/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { Layer } from '@app/shared/models/layer.model';
import { Store } from '@ngrx/store';
import { MapState, selectBehaviorState } from '@app/map/store';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as fromLayerActions from '@app/map/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-layer-configuration',
  templateUrl: './layer-configuration.component.html',
  styleUrls: ['./layer-configuration.component.css']
})
export class LayerConfigurationComponent implements OnInit {
  behaviors: any[];
  @Input() layer: Layer;

  constructor(private store: Store<MapState>, public modal: NgbActiveModal) { }

  ngOnInit() {
    this.store.select(selectBehaviorState).pipe(take(1)).subscribe((behaviorState) => {
      this.behaviors = behaviorState.behaviors.filter(b => b.layerId === this.layer.id);
    });
  }

  sendOpacity(e: any) {
    const sliderValue = e.target.valueAsNumber;
    const newLayer: Layer = {
      ...this.layer,
      opacity: sliderValue
      };
    this.store.dispatch(new fromLayerActions.UpdateLayer(newLayer));
  }

  putLayerOnTop(e: any) {
    const value = e.target.checked;
    const newLayer: Layer = {
      ...this.layer,
      alwaysOnTop: value
      };
    this.store.dispatch(new fromLayerActions.InitLayerPosition({
      layerId: newLayer.id,
      alwaysOnTop: newLayer.alwaysOnTop
    }));
  }
}
