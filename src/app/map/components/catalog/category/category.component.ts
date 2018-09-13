/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity/src/models';

import { MapState, selectCategoryEntities } from '@app/map/store';
import { Category, NormalizedCategory } from '@app/shared/models';
import * as layerInformationActions from '@app/map/store/actions/layer-information.actions';
import * as categoryActions from '@app/map/store/actions/category.actions';
import * as popupActions from '@app/map/store/actions/popup.actions';
import { LAYER_INFORMATION_POPUP_ID } from '../../map/map.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category: NormalizedCategory;

  categories: Observable<Dictionary<NormalizedCategory>>;

  constructor(private store: Store<MapState>) {
  }

  ngOnInit() {
    this.categories = this.store.select(selectCategoryEntities);
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
  onClickLayer(category: Category) {
    console.log('onClickLayer');
  }

  onShowLayerInfoClick(layerId) {
    this.store.dispatch(new layerInformationActions.SetSelectedLayerId(layerId));
    this.store.dispatch(new popupActions.SetIsOpen({popupId: LAYER_INFORMATION_POPUP_ID, isOpen: true}));
  }

  private removeLayer(category: Category) {
    console.log('removeLayer');
  }

  private activateLayer(category: Category) {
    console.log('activeLayer');
  }
}
