import {ObjectPropertyLocator} from './object-property-locator.util';

export class PropertyLocatorFactory {
  public static getPropertyLocator(contentType: string) {
    switch (contentType) {
      case 'json':
        return new ObjectPropertyLocator();
      default:
        return null;
    }
  }
}
