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

  constructor(private store: Store<MapState>) {
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

}
