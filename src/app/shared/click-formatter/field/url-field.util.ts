import {Field} from './field.util';
import {PropertyLocatorFactory} from '../../property-locator-factory.util';

export class UrlField implements Field {
  type: string;

  constructor(public fieldDef: any, public result: any, public contentType: string) {
    this.type = this.fieldDef.type;
  }

  getHTML(): string {
    const propertyLocator = PropertyLocatorFactory.getPropertyLocator(this.contentType);
    const url = propertyLocator.getValue(this.result, this.fieldDef.propertyPath);
    let urlLabel = propertyLocator.getValue(this.result, this.fieldDef.urlLabelPropertyPath);
    let urlCellContent = '';
    if (urlLabel == null && url != null) {
      urlLabel = url;
    }
    if (url != null) {
      urlCellContent += `<a href="${url}" target="_blank">${urlLabel}</a>`;
    }
    return `<td>${this.fieldDef.label}</td><td>${urlCellContent}</td>`;
  }
}
