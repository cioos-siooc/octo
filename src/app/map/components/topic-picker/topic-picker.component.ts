/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, OnInit} from '@angular/core';
import * as fromCatalog from '@app/map/store/reducers/catalog.reducers';
import * as catalogActions from '@app/map/store/actions/catalog.actions';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Topic} from '@app/shared/models';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '@env/environment';
import {MapState} from '../../store';
import {selectCatalogState} from '@app/map/store/selectors/catalog.selectors';

@Component({
  selector: 'app-topic-picker',
  templateUrl: './topic-picker.component.html',
  styleUrls: ['./topic-picker.component.css']
})
export class TopicPickerComponent implements OnInit {
  catalogState: Observable<fromCatalog.CatalogState>;

  constructor(private store: Store<MapState>, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.catalogState = this.store.select(selectCatalogState);
    this.translateService.get('language').subscribe((lang) => {
      this.store.dispatch(new catalogActions.FetchTopicGroup({languageCode: lang, code: environment.topicGroupCode}));
    });
  }

  onClickTopic(id: number, topic: Topic) {
    this.store.dispatch(new catalogActions.SetTopicExpanded({
      topicIndex: id,
      expanded: !topic.expanded
    }));
  }
}
