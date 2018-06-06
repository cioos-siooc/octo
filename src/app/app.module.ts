import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

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
  providers: [UrlBehaviorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
