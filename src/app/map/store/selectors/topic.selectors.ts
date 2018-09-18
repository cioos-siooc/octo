/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {selectMapState} from '../reducers';
import {createSelector} from '@ngrx/store';
import * as fromTopic from '../reducers/topic.reducers';

export const selectTopicState = createSelector(
  selectMapState,
  state => state.topic,
);

export const selectAllTopics = createSelector(
  selectTopicState,
  fromTopic.selectAllTopics
);

export const selectTopicIds = createSelector(
  selectTopicState,
  fromTopic.selectTopicIds
);

export const selectTopicEntities = createSelector(
  selectTopicState,
  fromTopic.selectTopicEntities
);

export const selectTopicsTotal = createSelector(
  selectTopicState,
  fromTopic.selectTopicsTotal
);
