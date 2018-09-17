/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, OnInit} from '@angular/core';
import * as fromCatalog from '@app/map/store/reducers/catalog.reducers';
import * as fromTopic from '@app/map/store/reducers/topic.reducers';
import * as catalogActions from '@app/map/store/actions/catalog.actions';
import * as categoryActions from '@app/map/store/actions/category.actions';
import * as topicActions from '@app/map/store/actions/topic.actions';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Topic} from '@app/shared/models';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '@env/environment';
import {MapState} from '../../store';
import {selectCatalogState} from '@app/map/store/selectors/catalog.selectors';
import {selectRootCategoryIds} from '@app/map/store/selectors/category.selectors';
import {selectTopicState, selectAllTopics} from '@app/map/store/selectors/topic.selectors';

@Component({
  selector: 'app-topic-picker',
  templateUrl: './topic-picker.component.html',
  styleUrls: ['./topic-picker.component.css']
})
export class TopicPickerComponent implements OnInit {
  catalogState: Observable<fromCatalog.CatalogState>;
  topics: Observable<Topic[]>;

  rootCategoryIds: Number[];

  constructor(private store: Store<MapState>, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.topics = this.store.select(selectAllTopics);
    this.store.select(selectRootCategoryIds).subscribe(rootCategoryIds => this.rootCategoryIds = rootCategoryIds);

    this.translateService.get('language').subscribe((lang) => {
      this.store.dispatch(new catalogActions.FetchTopicGroup({languageCode: lang, code: environment.topicGroupCode}));
      this.store.dispatch(new topicActions.FetchTopicGroup({languageCode: lang, code: environment.topicGroupCode}));
    });
  }

  onClickTopic(id: number, topic: Topic) {
    if (this.categoriesLoaded(topic.root)) {
      this.store.dispatch(new categoryActions.RemoveCategoryTree(topic.root));
    } else {
      this.store.dispatch(new categoryActions.FetchCategoriesForTopic(topic.id));
    }

    const updatedTopic = {
      ...topic,
      expanded: !topic.expanded
    };
    this.store.dispatch(new topicActions.UpdateTopic({id: updatedTopic.id, changes: updatedTopic}));
  }

  private categoriesLoaded(id: number) {
    return this.rootCategoryIds.filter(rootCatId => rootCatId === id).length > 0;
  }
}
