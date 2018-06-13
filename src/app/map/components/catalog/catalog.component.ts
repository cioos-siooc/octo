/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromCatalog from '@app/map/store/reducers/catalog.reducers';
import * as catalogActions from '@app/map/store/actions/catalog.actions';
import {Topic} from '@app/shared/models';
import {MapState} from '@app/map/store';
import {selectCatalogState} from '@app/map/store/selectors/catalog.selectors';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  catalogState: Observable<fromCatalog.CatalogState>;
  numExpandedTopics: number;

  constructor(private store: Store<MapState>) {
  }

  ngOnInit() {
    this.catalogState = this.store.select(selectCatalogState);
    this.catalogState.subscribe(state => {
      this.numExpandedTopics = 0;
      for (const topic of state.topics) {
        if (topic.expanded) {
          this.numExpandedTopics += 1;
        }
      }
    });
  }

  onClickTopic(id: number, topic: Topic) {
    this.store.dispatch(new catalogActions.SetTopicExpanded({
      topicIndex: id,
      expanded: !topic.expanded
    }));
  }
}
