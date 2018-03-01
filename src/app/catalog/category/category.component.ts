import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/category.model';
import { Store } from '@ngrx/store';

import * as fromCatalog from '../store/catalog.reducer';
import * as catalogActions from '../store/catalog.actions';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() categories: Category[];
  @Input() treeLocation: number[];

  constructor(
    private store: Store<fromCatalog.AppState>

  ) { }

  ngOnInit() { }

  onClickCategory(category: Category, treeLocation: number[]) {
    this.store.dispatch(new catalogActions.SetCategoryExpanded({
      treeLocation: treeLocation,
      isExpanded: !category.isExpanded 
    }));
  }
}
