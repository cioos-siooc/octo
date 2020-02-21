/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { environment } from './../../../../environments/environment';
import { TopicActionTypes, FetchTopicGroup, SetTopicGroup, FetchTopic } from './../actions/topic.actions';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import { switchMap, mergeMap, concatMap, map } from 'rxjs/operators';
import {MapState} from '../reducers';
import {TopicGroup} from '@app/shared/models';
import {Topic} from '@app/shared/models';

/**
 * Side effects for the topic reducer
 *
 * @export
 * @class TopicEffects
 */
@Injectable()
export class TopicEffects {
  /**
   * Fetches a TopicGroup from OctoPi based on the topic group code and languageCode
   *
   * @memberof TopicEffects
   */
  @Effect()
  fetchTopicGroup = this.actions$
    .ofType<FetchTopicGroup>(TopicActionTypes.FETCH_TOPIC_GROUP)
    .pipe(switchMap((action: FetchTopicGroup) => {
      return this.httpClient.get<TopicGroup>
      ( `${environment.mapapiUrl}/topic-groups/getTopicGroupForCode?code=${action.payload.code}` +
        `&language-code=${action.payload.languageCode}`);
    }),
    mergeMap((topicGroup) => [
      new SetTopicGroup(topicGroup),
      ...topicGroup.topicIds.map(topicId => {
        return new FetchTopic(topicId);
      })
    ])
  );

  /**
   * Fetches a topic from OctoPi based on the ID of the topic
   *
   * @memberof TopicEffects
   */
  @Effect()
  fetchTopic = this.actions$
    .ofType<FetchTopic>(TopicActionTypes.FETCH_TOPIC)
    .pipe(concatMap((action: FetchTopic) => {
        return this.httpClient.get<Topic>(`${environment.mapapiUrl}/topics/${action.payload}`);
    }),
    map(
      (topic) => {
        topic.expanded = false;
        return {
          type: TopicActionTypes.APPEND_TOPIC,
          payload: topic
        };
      }
    ));

  constructor(private actions$: Actions, private store$: Store<MapState>, private httpClient: HttpClient) {
  }
}
