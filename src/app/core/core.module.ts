import {NgModule} from '@angular/core';

import * as fromComponents from './components';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components],
})

export class CoreModule {}

