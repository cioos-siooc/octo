import { cloneDeep } from 'lodash';

import { Category } from '../shared/category.model';
import * as CatalogActions from './store/catalog.actions';
import { Topic } from '../shared/topic.model';

export default class Utils {
    static getCategory(category: Category, treeLocation) {
        let treeLoc = [...treeLocation];
        if (treeLocation.length <= 1) {
            return category.categories[treeLoc.shift()];
        } else {
            return this.getCategory(
                category.categories[treeLoc.shift()],
                treeLoc
            );
        }
    }

    static setCategory(startingCategory: Category, treeLocation: number[], newCategory: Category) {
        let categoryClone = cloneDeep(startingCategory);
        let categoryToUpdate = this.getCategory(categoryClone, treeLocation);
        Object.assign(categoryToUpdate, newCategory);
        return categoryClone;
    }

    static updateCategory(state, treeLocation, newCategory) {
        let treeLoc = [...treeLocation];
        let topicId = treeLoc.shift();
        let topicToUpdate: Topic = {...state.topics[topicId]};
        const updatedCategory: Category = Utils.setCategory(
            topicToUpdate.category, 
            treeLoc, 
            newCategory
        );
        topicToUpdate.category = updatedCategory;
        let updatedTopicList = [...state.topics];
        updatedTopicList[topicId] = topicToUpdate;
        return updatedTopicList;
    }
} 