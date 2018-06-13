/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

export class Category {
  constructor(public id: number,
              public label: string,
              public type: string,
              public layerId: number,
              public layerUniqueId: string,
              public categories: Category[],
              public isExpanded: boolean,
              public isChecked: boolean) {
  }
}
