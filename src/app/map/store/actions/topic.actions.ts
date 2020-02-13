/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { TopicGroup } from '@app/shared/models/topic-group.model';
import { Action } from '@ngrx/store';
import { Topic } from '@app/shared/models';
import { Update } from '@ngrx/entity';

export enum TopicActionTypes {
    FETCH_TOPIC_GROUP = '[Topic] Fetch Topic Group',
    SET_TOPIC_GROUP = '[Topic] Set Topic Group',
    SET_SELECTED_TOPIC = '[Topic] Set Selected Topic',
    FETCH_TOPIC = '[Topic] Fetch Topic',
    APPEND_TOPIC = '[Topic] Append Topic',
    UPDATE_TOPIC = '[Topic] Update Topic',
}

/**
 * Creates an instance of FetchTopicGroup which can be dispatched to the store
 *  FetchTopicGroup triggers an effect which fetches a topic group from OctoPi
 *
 * @export
 * @class FetchTopicGroupcatalog reducer
 * @implements {Action}
 */
export class FetchTopicGroup implements Action {
  readonly type = TopicActionTypes.FETCH_TOPIC_GROUP;

  /**
   *Creates an instance of FetchTopicGroup.
   * @param {{
   *  languageCode: string, - The language code currently in use: ie 'en'. Should correspond to a languageCode in OctoPi
   *  code: string - The code identifying which topic group to fetch.
   * }} payload
   * @memberof FetchTopicGroup
   */
  constructor(public payload: { languageCode: string, code: string }) {
  }
}

/**
 * Creates an instance of SetTopicGroup which can be dispatched to the store
 *  SetTopicGroup sets the currently loaded topic group in the topicGroup attribute of the topic reducer
 *
 * @export
 * @class SetTopicGroup
 * @implements {Action}
 */
export class SetTopicGroup implements Action {
  readonly type = TopicActionTypes.SET_TOPIC_GROUP;

  /**
   *Creates an instance of SetTopicGroup.
   * @param {TopicGroup} payload - The TopicGroup to be set
   * @memberof SetTopicGroup
   */
  constructor(public payload: TopicGroup) {
  }
}

/**
 * Creates an instance of SetSelectedTopic which can be dispatched to the store
 *  SetSelectedTopic sets the currently selected topic in the selectedTopic attribute of the topic reducer
 *
 * @export
 * @class SetSelectedTopic
 * @implements {Action}
 */
export class SetSelectedTopic implements Action {
  readonly type = TopicActionTypes.SET_SELECTED_TOPIC;

  /**
   *Creates an instance of SetSelectedTopic.
   * @param {Topic} payload - The currently selected topic of type Topic
   * @memberof SetSelectedTopic
   */
  constructor(public payload: Topic) {
  }
}

/**
 * Creates an instance of FetchTopic which can be dispatched to the store
 *  FetchTopic triggers an effect which fetches a topic from OctoPi based on its id,
 *  then append it to the list of topics
 *
 * @export
 * @class FetchTopic
 * @implements {Action}
 */
export class FetchTopic implements Action {
  readonly type = TopicActionTypes.FETCH_TOPIC;

  /**
   *Creates an instance of FetchTopic.
   * @param {number} payload - The id of the topic in mapapi
   * @memberof FetchTopic
   */
  constructor(public payload: number) {
  }
}

/**
 * Creates an instance of Appendtopic which can be dispatched to the store
 *  AppendTopic appends the result of FetchTopic to the topic reducer
 *
 * @export
 * @class AppendTopic
 * @implements {Action}
 */
export class AppendTopic implements Action {
  readonly type = TopicActionTypes.APPEND_TOPIC;

  /**
   * Creates an instance of AppendTopic.
   * @param {Topic} payload - The Topic result from mapapi
   * @memberof AppendTopic
   */
  constructor(public payload: Topic) {
  }
}

/**
 * Creates an instance of UpdateTopic which can be dispatched to the store
 *  UpdateTopic updates a topic in the topic reducer based on its id
 *
 * @export
 * @class UpdateTopic
 * @implements {Action}
 */
export class UpdateTopic implements Action {
  readonly type = TopicActionTypes.UPDATE_TOPIC;

  /**
   *Creates an instance of UpdateTopic.
   * @param {Update<Topic>} payload - The new version of the topic to be updated
   * @memberof UpdateTopic
   */
  constructor(public payload: Update<Topic>) {
  }
}

export type TopicActionsUnion =
    FetchTopicGroup |
    SetTopicGroup |
    SetSelectedTopic |
    FetchTopic |
    AppendTopic |
    UpdateTopic;
