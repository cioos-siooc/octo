import { Category } from "../../shared/category.model";

export default class Utils {
    static getCategory(category: Category, treeLocation) {
        let treeLoc = [...treeLocation];
        if (treeLocation.length <= 1) {
            return category.categories[treeLoc.shift()];
        } else {
            return this.getCategory(category.categories[treeLoc.shift()], treeLoc);
        }
    }

    static setCategory(startingCategory: Category, treeLocation, newCategory: Category) {
        
    }
} 