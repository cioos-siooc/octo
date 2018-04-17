import {Field} from './field.util';
import {PropertyLocatorFactory} from '../../property-locator-factory.util';

export class TextField implements Field {
  type: string;

  constructor(public fieldDef: any, public result: any, public contentType: string) {
  }

  getHTML(): string {
    const propertyLocator = PropertyLocatorFactory.getPropertyLocator(this.contentType);
    return `<td>${this.fieldDef.label}</td><td>${propertyLocator.getValue(this.result, this.fieldDef.propertyPath)}</td>`;
  }
}
