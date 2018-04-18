import {Field} from './field.util';
import {PropertyLocatorFactory} from '../../property-locator-factory.util';
import * as moment from 'moment';

export class DateField implements Field {
  type: string;

  constructor(public fieldDef: any, public result: any, public contentType: string) {
    this.type = this.fieldDef.type;
  }

  getHTML(): string {
    const propertyLocator = PropertyLocatorFactory.getPropertyLocator(this.contentType);
    let value = propertyLocator.getValue(this.result, this.fieldDef.propertyPath);
    if (value == null) {
      value = '';
    }
    value = moment(value).format(this.fieldDef.formatString);
    return `<td>${this.fieldDef.label}</td><td>${value}</td>`;
  }
}
