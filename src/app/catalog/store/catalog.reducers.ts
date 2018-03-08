import { TopicGroup } from '../../shared/topic-group.model';
import { Topic } from '../../shared/topic.model';
import * as CatalogActions from './catalog.actions';
import Utils from '../category.util';
import { Category } from '../../shared/category.model';
import { CatalogSelectedLayer } from '../../shared/catalog-selected-layer.model';


export interface AppState {
    catalog: State;
}

export interface State {
    topicGroup: TopicGroup,
    topics: Topic[],
    selectedLayers: CatalogSelectedLayer[]
}

const initialState: State = {
    topicGroup: new TopicGroup(-1, 'placeholder', null, []),
    topics: [],
    selectedLayers: []
};

export function catalogReducer(state = initialState, action: CatalogActions.CatalogActions) {
    switch (action.type) {
        case CatalogActions.SET_TOPIC_GROUP:
            return {
                ...state,
                topicGroup: action.payload
            };
        case CatalogActions.APPEND_TOPIC:
            const topics: Topic[] = [...state.topics, action.payload];
            return {
                ...state,
                topics: topics
            };
        case CatalogActions.SET_TOPIC_EXPANDED: 
            const topic: Topic = {...state.topics[action.payload.topicIndex]};
            topic.expanded = action.payload.expanded;

            const oldTopics: Topic[] = [...state.topics]
            oldTopics[action.payload.topicIndex] = topic;
            return {
                ...state,
                topics: oldTopics
            };
        case CatalogActions.SET_CATEGORIES:
            let idToUpdate = -1
            for (var i = 0; i < state.topics.length; i++) {
                if (state.topics[i].id === action.payload.topicId) {
                    idToUpdate = i;
                    break;
                }
            }
            const updatedTopic: Topic = {
                ...state.topics[idToUpdate],
                category: action.payload.category
            }
            const updatedTopics: Topic[] = [...state.topics];
            updatedTopics[idToUpdate] = updatedTopic;
            return {
                ...state,
                topics: updatedTopics
            };
        case CatalogActions.UPDATE_CATEGORY:
            let updatedTopicList = Utils.updateCategory(
                state,
                action.payload.treeLocation,
                action.payload.newCategory
            );
            return {
                ...state,
                topics: updatedTopicList
            };
        case CatalogActions.ADD_SELECTED_LAYER:
            return {
                ...state,
                selectedLayers: [...state.selectedLayers, action.payload]
            };
        case CatalogActions.REMOVE_SELECTED_LAYER:
            let selectedLayers = [...state.selectedLayers];
            for(let i=0; i<selectedLayers.length; i++) {
                if (selectedLayers[i].layerUniqueId === action.payload) {
                    let targetSelectedLayer = selectedLayers[i];
                    selectedLayers.splice(i, 1);

                    let tempTreeLoc = [...targetSelectedLayer.treeLocation];
                    let topicId = tempTreeLoc.shift();
                    let topicToUpdate: Topic = {...state.topics[topicId]};
                    let categoryToUpdate = Utils.getCategory(
                        topicToUpdate.category,
                        tempTreeLoc
                    );
                    let newCategory: Category = {
                        ...categoryToUpdate,
                        layerUniqueId: null,
                        isChecked: false
                    };
                    let updatedTopicList = Utils.updateCategory(
                        state,
                        targetSelectedLayer.treeLocation,
                        newCategory
                    );
                    return {
                        ...state,
                        topics: updatedTopicList
                    }
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