import { selectCategoryEntities, selectRootCategoryIds } from './../../store/selectors/category.selectors';
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {MapState} from '@app/map/store';
import { NormalizedCategory } from '@app/shared/models';
import { Dictionary } from '@ngrx/entity/src/models';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  categories: Observable<Dictionary<NormalizedCategory>>;
  rootCategoryIds: Observable<Number[]>;
  numExpandedTopics: number;

  constructor(private store: Store<MapState>) {
  }

  ngOnInit() {
    this.categories = this.store.select(selectCategoryEntities);
    this.rootCategoryIds = this.store.select(selectRootCategoryIds);
  }
}
