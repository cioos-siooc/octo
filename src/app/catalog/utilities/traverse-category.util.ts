import { cloneDeep } from 'lodash';

import { Category } from "../../shared/category.model";

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
} 