/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity/src/models';

import { MapState, selectCategoryEntities, selectLayerState } from '@app/map/store';
import { NormalizedCategory, Layer } from '@app/shared/models';
import * as layerInformationActions from '@app/map/store/actions/layer-information.actions';
import * as categoryActions from '@app/map/store/actions/category.actions';
import * as popupActions from '@app/map/store/actions/popup.actions';
import * as layerActions from '@app/map/store/actions/layer.actions';
import * as fromLayer from '@app/map/store/reducers/layer.reducers';
import { LAYER_INFORMATION_POPUP_ID } from '../../map/map.component';
import { take } from 'rxjs/operators';
import { selectCategoryById } from './../../../store/selectors/category.selectors';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category: NormalizedCategory;


  categories: Observable<Dictionary<NormalizedCategory>>;
  layers: Layer[];

  constructor(private store: Store<MapState>) {
  }

  ngOnInit() {
    this.categories = this.store.select(selectCategoryEntities);
    this.store.select(selectLayerState)
      .subscribe((layerState: fromLayer.LayerState) => {
        this.layers = layerState.layers;
      });
  }

  /**
   * Expand or collapse the category
   * @param {NormalizedCategory} category the category of type "NormalizedCategory"
   */
  onClickCategory(category: NormalizedCategory) {
    const updatedCategory = {
      ...category,
      isExpanded: !category.isExpanded
    };
    this.store.dispatch(new categoryActions.UpdateCategory({id: updatedCategory.id, changes: updatedCategory}));
  }

  /**
   * Create or destroy the layer
   * @param {Category} category the category of type "layer"
   */
  onClickLayer(category: NormalizedCategory) {
    if (this.layerIsAdded(category)) {
      this.removeLayer(category);
    } else {
      this.addLayer(category);
    }
  }

  onShowLayerInfoClick(layerId) {
    this.store.dispatch(new layerInformationActions.SetSelectedLayerId(layerId));
    this.store.dispatch(new popupActions.SetIsOpen({popupId: LAYER_INFORMATION_POPUP_ID, isOpen: true}));
  }

  private addLayer(category: NormalizedCategory) {
    if (category.type === 'layerGroup') {
      for (const category_id of category.categories) {
        this.store.select(selectCategoryById(category_id)).pipe(take(1)).subscribe((c: NormalizedCategory) => {
          this.store.dispatch(new layerActions.FetchLayer({
            layerId: c.layerId,
            layerGroupId: category.id,
          }));
        });
      }
    }
    this.store.dispatch(new layerActions.FetchLayer({
      layerId: category.layerId,
    }));
  }

  private removeLayer(category: NormalizedCategory) {
    this.store.dispatch(new layerActions.DeleteLayer(category.layerId));
  }

  layerIsAdded(category: NormalizedCategory) {
    const matchingLayers = this.layers.filter(
      (l: Layer) => l.id === category.layerId
    );
    return matchingLayers.length > 0;
  }
}
