import { TopicGroup } from '@app/shared/models/topic-group.model';
import { Action } from '@ngrx/store';
import { Topic } from '@app/shared/models';
import { Update } from '@ngrx/entity';

export enum TopicActionTypes {
    FETCH_TOPIC_GROUP = '[Topic] Fetch Topic Group',
    SET_TOPIC_GROUP = '[Topic] Set Topic Group',
    FETCH_TOPIC = '[Topic] Fetch Topic',
    APPEND_TOPIC = '[Topic] Append Topic',
    UPDATE_TOPIC = '[Topic] Update Topic',
}

/**
 * Trigger an effect to fetch a topic group
 *
 * @export
 * @class FetchTopicGroupcatalog reducer
 * @implements {Action}
 */
export class FetchTopicGroup implements Action {
  readonly type = TopicActionTypes.FETCH_TOPIC_GROUP;

  /**
   * Creates an instance of FetchTopicGroup.
   * @param {number} payload - The id of the topic group in mapapi
   * @memberof FetchTopicGroup
   */
  constructor(public payload: { languageCode: string, code: string }) {
  }
}

/**
 * Set the currently loaded topic group
 *
 * @export
 * @class SetTopicGroup
 * @implements {Action}
 */
export class SetTopicGroup implements Action {
  readonly type = TopicActionTypes.SET_TOPIC_GROUP;

  /**
   *Creates an instance of SetTopicGroup.
   * @param {TopicGroup} payload - The TopicGroup result from mapapi
   * @memberof SetTopicGroup
   */
  constructor(public payload: TopicGroup) {
  }
}

/**
 * Trigger an effect to fetch a topic using its id, then append it to the list of topics
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
 * Append the result of FetchTopic to the reducer
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

export class UpdateTopic implements Action {
  readonly type = TopicActionTypes.UPDATE_TOPIC;

  constructor(public payload: Update<Topic>) {
  }
}

export type TopicActionsUnion =
    FetchTopicGroup |
    SetTopicGroup |
    FetchTopic |
    AppendTopic |
    UpdateTopic;
