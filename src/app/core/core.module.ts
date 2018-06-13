/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {NgModule} from '@angular/core';

import * as fromComponents from './components';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule,
    NgbModule,
  ],
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components],
})

export class CoreModule {
}

