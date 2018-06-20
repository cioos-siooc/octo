/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, Input, OnInit} from '@angular/core';
import {TextField} from '../../../../../utils/click-formatter/field/text-field.util';
import {PropertyLocatorFactory} from '../../../../../../shared/utils/property-locator-factory.util';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit {

  @Input() result;
  value: string;

  private _field: TextField;

  get field(): TextField {
    return this._field;
  }

  @Input()
  set field(field: TextField) {
    this._field = field;
    const propertyLocator = PropertyLocatorFactory.getPropertyLocator(this._field.contentType);
    this.value = propertyLocator.getValue(this.result, this._field.fieldDef.propertyPath);
  }

  ngOnInit() {
  }

}
