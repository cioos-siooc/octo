/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import {environment} from '@env/environment.prod';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './core/components';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UrlBehaviorService} from './map/services/url-behavior.service';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {MapModule} from './map/map.module';


@NgModule({
  declarations: [],
  imports: [
    NgbModule.forRoot(),
    SharedModule,
    MapModule,
    BrowserModule,
    CoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    AppRoutingModule
  ],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}, UrlBehaviorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
