import { selectLayerCategoryIds } from './../../../store/selectors/category.selectors';
import { DeleteLayer } from './../../../store/actions/layer.actions';
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
  descriptionExpanded: Boolean;

  constructor(private store: Store<MapState>) { }

  ngOnInit() {
  }

  displayLayer(e) {
    const isVisible = e.target.checked;
    const newLayer: Layer = {
      ...this.layer,
      isVisible: isVisible
      };
    this.store.dispatch(new fromLayerActions.UpdateLayer(newLayer));
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
    this.store.dispatch(new DeleteLayer(layerId.toString()));
  }
}
