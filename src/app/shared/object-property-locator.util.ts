import {PropertyLocator} from './property-locator.utils';

export class ObjectPropertyLocator implements PropertyLocator {
  getValue(obj: any, path: any): any {
    if (!path) {
      return null;
    }
    const separator = '/';
    let i, len;

    for (i = 0, path = path.split(separator), len = path.length; i < len; i++) {
      if (!obj || typeof obj !== 'object') {
        return null;
      }
      obj = obj[path[i]];
    }

    if (obj === undefined) {
      return null;
    }
    return obj;
  }
}
