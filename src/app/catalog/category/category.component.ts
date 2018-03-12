import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {Category} from '../../shared/category.model';
import CreateLayer from '../../shared/create-layer.utility';
import * as catalogActions from '../store/catalog.actions';
import * as layerActions from '../../map/store/layer.actions';
import * as fromCatalog from '../store/catalog.reducers';
import {CatalogSelectedLayer} from '../../shared/catalog-selected-layer.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;
  @Input() treeLocation: number[];

  constructor(private store: Store<fromCatalog.AppState>) {
  }

  ngOnInit() {
  }

  onClickCategory(category: Category, treeLocation: number[]) {
    if (category.type === 'layer') {
      // If the clicked category represents a layer create or destroy the layer
      category.isChecked = !category.isChecked;

      if (category.isChecked) {
        // Instantiate a layer
        category.layerUniqueId = CreateLayer.createLayer(category.layerId, this.store);
        this.store.dispatch(new catalogActions.AddSelectedLayer(
          new CatalogSelectedLayer(
            category.layerUniqueId,
            treeLocation
          )
        ));
        this.store.dispatch(new catalogActions.UpdateCategory({
          treeLocation: treeLocation,
          newCategory: {
            ...category
          }
        }));
      } else {
        // Remove a layer
        this.store.dispatch(
          new layerActions.DeleteLayer(category.layerUniqueId)
        );
        this.store.dispatch(
          new catalogActions.RemoveSelectedLayer(category.layerUniqueId)
        );
        category.layerUniqueId = null;
        this.store.dispatch(new catalogActions.UpdateCategory({
          treeLocation: treeLocation,
          newCategory: {
            ...category
          }
        }));
      }
    } else if (category.categories) {
      // If the clicked category represents a category expand or collapse it
      this.store.dispatch(new catalogActions.UpdateCategory({
        treeLocation: treeLocation,
        newCategory: {
          ...category,
          isExpanded: !category.isExpanded
        }
      }));
    }
  }
}
