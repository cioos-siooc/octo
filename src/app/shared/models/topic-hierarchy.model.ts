/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Category} from './category.model';

export class TopicHierarchy {
  constructor(public id: number,
              public code: string,
              public languageCode: string,
              public root: Category) {
  }
}
