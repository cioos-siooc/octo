import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment.prod';
import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogEffects } from './catalog/store/catalog.effects';
import { catalogReducer } from './catalog/store/catalog.reducer';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { OpenLayersComponent } from './map/open-layers/open-layers.component';
import { PopupComponent } from './popup/popup.component';
import { AppRoutingModule } from './/app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    OpenLayersComponent,
    HeaderComponent,
    CatalogComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({catalog: catalogReducer}),
    EffectsModule.forRoot([CatalogEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
