import { Layer } from '@app/shared/models';
import { MapState } from '@app/map/store';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import * as fromLayerActions from '@app/map/store';

@Component({
  selector: 'app-layer-group',
  templateUrl: './layer-group.component.html',
  styleUrls: ['./layer-group.component.css']
})
export class LayerGroupComponent implements OnInit {
  @Input() layer: Layer;
  // childrenLayers: Layer;
  descriptionExpanded: Boolean;

  constructor(private store: Store<MapState>) { }

  ngOnInit() {
  }

  open() {
    // TODO: Will it work? Technically needs to affect all children layers but need to handle this in LayerConfig

    // const modalref = this.modal.open(LayerConfigurationComponent, { centered: true, size: 'sm'});
    // modalref.componentInstance.layer = this.layer;
  }

  displayLayer(e) {
    // TODO: Need to trigger the display false of each child

    // const isVisible = e.target.checked;
    // const newLayer: Layer = {
    //   ...this.layer,
    //   isVisible: isVisible
    //   };
    // this.store.dispatch(new fromLayerActions.UpdateLayer(newLayer));
  }

  collapseInfo() {
    this.layer.isCollapsed = !this.layer.isCollapsed;
    const newLayer: Layer = {
      ...this.layer,
      isCollapsed: this.layer.isCollapsed
      };
    this.store.dispatch(new fromLayerActions.UpdateLayer(newLayer));
  }

  toggleExpandDescription() {
    if (this.descriptionExpanded) {
      this.descriptionExpanded = false;
    } else {
      this.descriptionExpanded = true;
    }
  }

  removeLayer(layerId: number) {
    // TODO: Add effect to layer reducer that removes all children with the layers

    // this.store.dispatch(new DeleteLayer(layerId.toString()));
  }
}
