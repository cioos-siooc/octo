import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {Category} from '../../shared/category.model';
import ActivateLayer from '../../shared/activate-layer.util';
import * as catalogActions from '../store/catalog.actions';
import * as layerActions from '../../map/store/layer.actions';
import * as fromApp from '../../store/app.reducers';
import {CatalogSelectedLayer} from '../../shared/catalog-selected-layer.model';
import {LAYER_INFORMATION_POPUP_ID} from '../../map/map.component';
import * as layerInformationActions from '../../layer-information/store/layer-information.actions';
import * as popupActions from '../../map/store/popup.actions';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;
  @Input() treeLocation: number[];

  constructor(private store: Store<fromApp.AppState>) {
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
    category.isChecked = !category.isChecked;

    if (category.isChecked) {
      this.activateLayer(category, treeLocation);
    } else {
      this.removeLayer(category, treeLocation);
    }
  }

  private removeLayer(category: Category, treeLocation: number[]) {
    this.store.dispatch(
      new layerActions.DeleteLayer(category.layerUniqueId)
    );
    this.store.dispatch(
      new catalogActions.RemoveSelectedLayer(category.layerUniqueId)
    );
    category.layerUniqueId = null;
    this.store.dispatch(new catalogActions.UpdateCategory({
      treeLocation: treeLocation,
      newCategory: <Category>{
        ...category
      }
    }));
  }

  private activateLayer(category: Category, treeLocation: number[]) {
    category.layerUniqueId = ActivateLayer.activateLayer(category.layerId, this.store);
    this.store.dispatch(new catalogActions.AddSelectedLayer(
      new CatalogSelectedLayer(
        category.layerUniqueId,
        treeLocation
      )
    ));
    this.store.dispatch(new catalogActions.UpdateCategory({
      treeLocation: treeLocation,
      newCategory: <Category>{
        ...category
      }
    }));
  }

  onShowLayerInfoClick(layerId) {
    this.store.dispatch(new layerInformationActions.SetSelectedLayerId(layerId));
    this.store.dispatch(new popupActions.SetIsOpen({popupId: LAYER_INFORMATION_POPUP_ID, isOpen: true}));
  }
}
