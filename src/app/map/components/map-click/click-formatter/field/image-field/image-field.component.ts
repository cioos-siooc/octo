/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, Input, OnInit} from '@angular/core';
import {PropertyLocatorFactory} from '../../../../../../shared/utils/property-locator-factory.util';
import {ImageField} from '../../../../../utils/click-formatter/field/image-field.util';

@Component({
  selector: 'app-image-field',
  templateUrl: './image-field.component.html',
  styleUrls: ['./image-field.component.css', './image-field-responsive.component.css']
})
export class ImageFieldComponent implements OnInit {

  value: string;
  href:  string;
  @Input() result;

  private _field: ImageField;

  get field(): ImageField {
    return this._field;
  }

  @Input()
  set field(field: ImageField) {
    this._field = field;
    const propertyLocator = PropertyLocatorFactory.getPropertyLocator(this._field.contentType);
    this.value = propertyLocator.getValue(this.result, this._field.fieldDef.propertyPath);
    this.href = propertyLocator.getValue(this.result, this._field.fieldDef.fullscreenPropertyPath);
    if (this.href == null) {
      this.href = this.value;
    }
  }

  ngOnInit() {
  }

}
