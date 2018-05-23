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

