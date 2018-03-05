import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/category.model';
import { Store } from '@ngrx/store';

import * as fromCatalog from '../store/catalog.reducer';
import * as catalogActions from '../store/catalog.actions';
import * as layerActions from '../../map/store/layer.actions';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;
  @Input() treeLocation: number[];

  constructor(
    private store: Store<fromCatalog.AppState>

  ) { }

  ngOnInit() {
  }

  onClickCategory(category: Category, treeLocation: number[]) {
    if (category.type === 'layer') {
      // Instantiate a layer
      this.store.dispatch(new layerActions.FetchLayer(category.layerId));
    } else if(category.categories) {
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
