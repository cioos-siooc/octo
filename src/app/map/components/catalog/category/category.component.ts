/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import * as catalogActions from '@app/map/store/actions/catalog.actions';
import * as layerActions from '@app/map/store/actions/layer.actions';
import * as layerInformationActions from '@app/map/store/actions/layer-information.actions';
import * as popupActions from '@app/map/store/actions/popup.actions';
import {Category} from '@app/shared/models';
import {CatalogSelectedLayer} from '@app/shared/models';
import {LAYER_INFORMATION_POPUP_ID} from '../../map/map.component';
import ActivateLayer from '@app/map/utils/activate-layer.util';
import {MapState} from '@app/map/store';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;
  @Input() treeLocation: number[];

  constructor(private store: Store<MapState>) {
  }

  ngOnInit() {
  }

  /**
   * Expand or collapse the category
   * @param {Category} category the category of type "category"
   * @param {number[]} treeLocation the location of the category within the hierarchy
   */
  onClickCategory(category: Category, treeLocation: number[]) {
    if (category.categories) {
      this.store.dispatch(new catalogActions.UpdateCategory({
        treeLocation: treeLocation,
        newCategory: <Category>{
          ...category,
          isExpanded: !category.isExpanded
        }
      }));
    }
  }

  /**
   * Create or destroy the layer
   * @param {Category} category the category of type "layer"
   * @param {number[]} treeLocation the location of the category within the hierarchy
   */
  onClickLayer(category: Category, treeLocation: number[]) {
    const newCategory = {
      ...category,
      isChecked: !category.isChecked
    };

    // Dispatch an action to toggle the isChecked property in the catalog state
    this.store.dispatch(new catalogActions.UpdateCategory({
      treeLocation: treeLocation,
      newCategory: newCategory
    }));

    // Add the layer to the active layers if necessary
    if (newCategory.isChecked) {
      this.activateLayer(newCategory, treeLocation);
    } else {
      this.removeLayer(newCategory, treeLocation);
    }
  }

  onShowLayerInfoClick(layerId) {
    this.store.dispatch(new layerInformationActions.SetSelectedLayerId(layerId));
    this.store.dispatch(new popupActions.SetIsOpen({popupId: LAYER_INFORMATION_POPUP_ID, isOpen: true}));
  }

  private removeLayer(category: Category, treeLocation: number[]) {
    this.store.dispatch(
      new layerActions.DeleteLayer(category.layerUniqueId)
    );
    this.store.dispatch(
      new catalogActions.RemoveSelectedLayer(category.layerUniqueId)
    );
    this.store.dispatch(new catalogActions.UpdateCategory({
      treeLocation: treeLocation,
      newCategory: <Category>{
        ...category,
        layerUniqueId: null
      }
    }));
  }

  private activateLayer(category: Category, treeLocation: number[]) {
    const layerUniqueId = ActivateLayer.activateLayer(category.layerId, this.store);
    this.store.dispatch(new catalogActions.AddSelectedLayer(
      new CatalogSelectedLayer(
        layerUniqueId,
        treeLocation
      )
    ));
    this.store.dispatch(new catalogActions.UpdateCategory({
      treeLocation: treeLocation,
      newCategory: <Category>{
        ...category,
        layerUniqueId: layerUniqueId
      }
    }));
  }
}
