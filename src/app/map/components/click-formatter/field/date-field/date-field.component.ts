import {Component, Input, OnInit} from '@angular/core';
import {DateField} from '../date-field.util';
import {PropertyLocatorFactory} from '../../../../../shared/property-locator-factory.util';
import * as moment from 'moment';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.css']
})
export class DateFieldComponent implements OnInit {
  value: string;

  constructor() {
  }

  private _field: DateField;

  get field(): DateField {
    return this._field;
  }

  @Input()
  set field(field: DateField) {
    this._field = field;
    const propertyLocator = PropertyLocatorFactory.getPropertyLocator(this._field.contentType);
    let value = propertyLocator.getValue(this._field.result, this._field.fieldDef.propertyPath);
    if (value == null) {
      value = '';
    } else {
      value = moment(value).format(this._field.fieldDef.formatString);
    }
    this.value = value;
  }

  ngOnInit() {
  }

}
