import {TopicGroup} from '../../shared/topic-group.model';
import {Topic} from '../../shared/topic.model';
import * as catalogActions from './catalog.actions';
import Utils from '../category.util';
import {CatalogSelectedLayer} from '../../shared/catalog-selected-layer.model';

export interface State {
  topicGroup: TopicGroup;
  topics: Topic[];
  selectedLayers: CatalogSelectedLayer[];
}

const initialState: State = {
  topicGroup: new TopicGroup(-1, 'placeholder', null, []),
  topics: [],
  selectedLayers: []
};

export function catalogReducer(state: State = initialState, action: catalogActions.CatalogActions) {
  switch (action.type) {
    case catalogActions.SET_TOPIC_GROUP:
      return {
        ...state,
        topicGroup: (<any>action).payload
      };
    case catalogActions.APPEND_TOPIC:
      const topics: Topic[] = [...state.topics, (<any>action).payload];
      return {
        ...state,
        topics: topics
      };
    case catalogActions.SET_TOPIC_EXPANDED:
      const topic: Topic = <Topic>{...state.topics[(<any>action).payload.topicIndex]};
      topic.expanded = (<any>action).payload.expanded;

      const oldTopics: Topic[] = [...state.topics];
      oldTopics[(<any>action).payload.topicIndex] = topic;
      return {
        ...state,
        topics: oldTopics
      };
    case catalogActions.SET_CATEGORIES:
      let idToUpdate = -1;
      for (let i = 0; i < state.topics.length; i++) {
        if (state.topics[i].id === (<any>action).payload.topicId) {
          idToUpdate = i;
          break;
        }
      }
      const updatedTopic: Topic = {
        ...state.topics[idToUpdate],
        category: (<any>action).payload.category
      };
      const updatedTopics: Topic[] = [...state.topics];
      updatedTopics[idToUpdate] = updatedTopic;
      return {
        ...state,
        topics: updatedTopics
      };
    case catalogActions.UPDATE_CATEGORY:
      const updatedTopicList = Utils.updateCategory(
        state,
        (<any>action).payload.treeLocation,
        (<any>action).payload.newCategory
      );
      return {
        ...state,
        topics: updatedTopicList
      };
    case catalogActions.ADD_SELECTED_LAYER:
      return {
        ...state,
        selectedLayers: [...state.selectedLayers, (<any>action).payload]
      };
    case catalogActions.REMOVE_SELECTED_LAYER:
      const selectedLayers = [...state.selectedLayers];
      for (let i = 0; i < selectedLayers.length; i++) {
        if (selectedLayers[i].layerUniqueId === (<any>action).payload) {
          const targetSelectedLayer = selectedLayers[i];
          selectedLayers.splice(i, 1);

          const tempTreeLoc = [...targetSelectedLayer.treeLocation];
          const topicId = tempTreeLoc.shift();
          const topicToUpdate: Topic = {...state.topics[topicId]};
          const categoryToUpdate = Utils.getCategory(
            topicToUpdate.category,
            tempTreeLoc
          );
          const newCategory = {
            ...categoryToUpdate,
            layerUniqueId: null,
            isChecked: false
          };
          const updatedTopicList_l = Utils.updateCategory(
            state,
            targetSelectedLayer.treeLocation,
            newCategory
          );
          return {
            ...state,
            topics: updatedTopicList_l
          };
        }
      }
      return {
        ...state,
        selectedLayers: selectedLayers
      };
    default:
      return state;
  }
}
