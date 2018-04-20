import {Component, Input, OnInit} from '@angular/core';
import {TextField} from '../text-field.util';
import {PropertyLocatorFactory} from '../../../property-locator-factory.util';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit {
  constructor() {
  }

  private _field: TextField;
  private value: string;

  get field(): TextField {
    return this._field;
  }

  @Input()
  set field(field: TextField) {
    this._field = field;
    const propertyLocator = PropertyLocatorFactory.getPropertyLocator(this._field.contentType);
    let value = propertyLocator.getValue(this._field.result, this._field.fieldDef.propertyPath);
    if (value == null) {
      value = '';
    }
    this.value = value;
  }

  ngOnInit() {
  }

}
