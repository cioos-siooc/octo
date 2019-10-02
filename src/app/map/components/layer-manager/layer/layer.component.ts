/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { LayerConfigurationComponent } from '@app/map/components/layer-configuration/layer-configuration.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Layer } from '@app/shared/models';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromLayerActions from '@app/map/store';
import { MapState } from '@app/map/store';
import { DeleteLayer } from '@app/map/store/actions/layer.actions';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css']
})
export class LayerComponent implements OnInit {
  @Input() layer: Layer;
  descriptionExpanded: Boolean;

  constructor(public modal: NgbModal, private store: Store<MapState>) {
  }

  ngOnInit() {
    this.descriptionExpanded = false;
  }

  toggleExpandDescription(event) {
      const toggleClassName = 'collapsed-description';

      if (this.descriptionExpanded) {
        this.descriptionExpanded = false;
      } else {
        this.descriptionExpanded = true;
      }
  }

  removeLayer(layerId: number) {
      this.store.dispatch(new DeleteLayer(layerId.toString()));
  }

  collapseInfo() {
    this.layer.isCollapsed = !this.layer.isCollapsed;
    const newLayer: Layer = {
      ...this.layer,
      isCollapsed: this.layer.isCollapsed
      };
    this.store.dispatch(new fromLayerActions.UpdateLayer(newLayer));
  }

  open() {
    const modalref = this.modal.open(LayerConfigurationComponent, { centered: true, size: 'sm'});
    modalref.componentInstance.layer = this.layer;
  }

  displayLayer(e) {
    // console.log(e);
    console.log(this.layer);
    const isVisible = e.target.checked;
    const newLayer: Layer = {
      ...this.layer,
      isVisible: isVisible
      };
    this.store.dispatch(new fromLayerActions.UpdateLayer(newLayer));
    console.log(newLayer);
  }

}
