import {Component, Input, OnInit} from '@angular/core';
import {UrlField} from '../../../../../utils/click-formatter/field/url-field.util';
import {PropertyLocatorFactory} from '../../../../../../shared/property-locator-factory.util';

@Component({
  selector: 'app-url-field',
  templateUrl: './url-field.component.html',
  styleUrls: ['./url-field.component.css']
})
export class UrlFieldComponent implements OnInit {
  value: any;
  urlLabel: string;
  url: string;

  private _field: UrlField;

  get field(): UrlField {
    return this._field;
  }

  @Input()
  set field(field: UrlField) {
    this._field = field;
    const propertyLocator = PropertyLocatorFactory.getPropertyLocator(this._field.contentType);
    const url = propertyLocator.getValue(this._field.result, this._field.fieldDef.propertyPath);
    let urlLabel = propertyLocator.getValue(this._field.result, this._field.fieldDef.urlLabelPropertyPath);
    if (urlLabel == null && url != null) {
      urlLabel = url;
    }
    this.url = url;
    this.urlLabel = urlLabel;
  }

  ngOnInit() {
  }

}
