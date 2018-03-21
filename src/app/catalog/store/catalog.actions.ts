import {Action} from '@ngrx/store';

import {TopicGroup} from '../../shared/topic-group.model';
import {Topic} from '../../shared/topic.model';
import {Category} from '../../shared/category.model';
import {CatalogSelectedLayer} from '../../shared/catalog-selected-layer.model';

export const FETCH_TOPIC_GROUP = 'FETCH_TOPIC_GROUP';
export const SET_TOPIC_GROUP = 'SET_TOPIC_GROUP';
export const FETCH_TOPIC = 'FETCH_TOPIC';
export const FETCH_TOPIC_FOR_CODE = 'FETCH_TOPIC_FOR_CODE';
export const APPEND_TOPIC = 'APPEND_TOPIC';
export const SET_TOPIC_EXPANDED = 'SET_TOPIC_EXPANDED';
export const FETCH_CATEGORY_HIERARCHY = 'FETCH_CATEGORY_HIERARCHY';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const ADD_SELECTED_LAYER = 'ADD_SELECTED_LAYER';
export const REMOVE_SELECTED_LAYER = 'REMOVE_SELECTED_LAYER';

/**
 * Trigger an effect to fetch a topic group
 *
 * @export
 * @class FetchTopicGroup
 * @implements {Action}
 */
export class FetchTopicGroup implements Action {
  readonly type = FETCH_TOPIC_GROUP;

  /**
   * Creates an instance of FetchTopicGroup.
   * @param {number} payload - The id of the topic group in mapapi
   * @memberof FetchTopicGroup
   */
  constructor(public payload: { languageCode: string, code: string }) {
  }
}

/**
 * Use the reducer to store the FetchTopicGroup result
 *
 * @export
 * @class SetTopicGroup
 * @implements {Action}
 */
export class SetTopicGroup implements Action {
  readonly type = SET_TOPIC_GROUP;

  /**
   * Creates an instance of SetTopicGroup.
   * @param {TopicGroup} payload - The TopicGroup result from mapapi
   * @memberof SetTopicGroup
   */
  constructor(public payload: TopicGroup) {
  }
}

/**
 * Fetch a topic using its id and then append it to the list of topics
 *
 * @export
 * @class FetchTopic
 * @implements {Action}
 */
export class FetchTopic implements Action {
  readonly type = FETCH_TOPIC;

  /**
   * Creates an instance of FetchTopic.
   * @param {number} payload - The id of the topic in mapapi
   * @memberof FetchTopic
   */
  constructor(public payload: number) {
  }
}

/**
 * Fetch a topic using its code and language-code and then append it to the list of topics
 *
 * @export
 * @class FetchTopicForCode
 * @implements (Action)
 */
export class FetchTopicForCode implements Action {
  readonly type = FETCH_TOPIC_FOR_CODE;

  constructor(public payload: { languageCode: string, code: string }) {
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
  readonly type = APPEND_TOPIC;

  /**
   * Creates an instance of AppendTopic.
   * @param {Topic} payload - The Topic result from mapapi
   * @memberof AppendTopic
   */
  constructor(public payload: Topic) {
  }
}

/**
 * Set a topic to expanded for display in the UI, trigger an action to fetch
 * the category hierarchy.
 *
 * @export
 * @class SetTopicExpanded
 * @implements {Action}
 */
export class SetTopicExpanded implements Action {
  readonly type = SET_TOPIC_EXPANDED;

  /**
   * Creates an instance of SetTopicExpanded.
   * @param {{
     *         topicIndex: number, - The index of the topic in the reducer topic
     *                               list
     *         expanded: boolean - The new expanded setting for the target topic
     *     }} payload
   * @memberof SetTopicExpanded
   */
  constructor(public payload: {
    topicIndex: number,
    expanded: boolean
  }) {
  }
}

/**
 * Trigger an effect to fetch the category hierarchy from mapapi
 *
 * @export
 * @class FetchCategoryHierarchy
 * @implements {Action}
 */
export class FetchCategoryHierarchy implements Action {
  readonly type = FETCH_CATEGORY_HIERARCHY;

  /**
   * Creates an instance of FetchCategoryHierarchy.
   * @param {number} payload - The index of the topic in the reducer topic list
   * @memberof FetchCategoryHierarchy
   */
  constructor(public payload: number) {
  }
}

/**
 * Use the reducer to store the result of the FetchCategoryHierarchy effect in
 * the relevant topic in the reduceer
 *
 * @export
 * @class SetCategories
 * @implements {Action}
 */
export class SetCategories implements Action {
  readonly type = SET_CATEGORIES;

  /**
   * Creates an instance of SetCategories.
   * @param {{
     *         topicId: number, - The id of the topic in mapapi
     *         category: Category - The category hierarchy result from mapapi
     *     }} payload
   * @memberof SetCategories
   */
  constructor(public payload: {
    topicId: number,
    category: Category
  }) {
  }
}

/**
 * Update a category that's nested in the category hierarchy
 *
 * @export
 * @class UpdateCategory
 * @implements {Action}
 */
export class UpdateCategory implements Action {
  readonly type = UPDATE_CATEGORY;

  /**
   * Creates an instance of UpdateCategory.
   * @param {{
     *         treeLocation: number[], - The list of indices for traversing into
     *                                   the category hierarchy to access the
     *                                   category to be replaced.
     *         newCategory: Category - The replacement category to be used
     *     }} payload
   * @memberof UpdateCategory
   */
  constructor(public payload: {
    treeLocation: number[],
    newCategory: Category
  }) {
  }
}

/**
 * Add a SelectedLayer to the selectedLayer list in the reducer. This list is
 * used to track the treeLocations of the categories for currently
 * selected layers so that they can be easily updated and modified based on
 * their unique layerid.
 *
 * @export
 * @class AddSelectedLayer
 * @implements {Action}
 */
export class AddSelectedLayer implements Action {
  readonly type = ADD_SELECTED_LAYER;

  /**
   * Creates an instance of AddSelectedLayer.
   * @param {CatalogSelectedLayer} payload - The CataLogSelectedLayer to add
   * @memberof AddSelectedLayer
   */
  constructor(public payload: CatalogSelectedLayer) {
  }
}

/**
 * Remove a SelectedLayer from the selectedLayer list in the reducer
 *
 * @export
 * @class RemoveSelectedLayer
 * @implements {Action}
 */
export class RemoveSelectedLayer implements Action {
  readonly type = REMOVE_SELECTED_LAYER;

  /**
   * Creates an instance of RemoveSelectedLayer.
   * @param {string} payload - The unique layerid of the selectedLayer entry
   *                           to be removed
   * @memberof RemoveSelectedLayer
   */
  constructor(public payload: string) {
  }
}

export type CatalogActions =
  FetchTopicGroup |
  FetchTopicForCode |
  SetTopicGroup |
  FetchTopic |
  AppendTopic |
  SetTopicExpanded |
  FetchCategoryHierarchy |
  SetCategories |
  UpdateCategory |
  AddSelectedLayer |
  RemoveSelectedLayer;
