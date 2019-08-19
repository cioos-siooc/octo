import { LayerConfigurationComponent } from '@app/map/components/layer-configuration/layer-configuration.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Layer } from '@app/shared/models';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

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
  isCollapsed = false;

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
    this.isCollapsed = !this.isCollapsed;
  }

  open() {
    const modalref = this.modal.open(LayerConfigurationComponent, { centered: true, size: 'sm'});
    modalref.componentInstance.layer = this.layer;
  }

}
