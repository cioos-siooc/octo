import {Component, OnInit} from '@angular/core';
import * as fromApp from './store/app.reducers';
import {Layer} from './shared/layer.model';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as baseLayerActions from './map/store/base-layer.actions';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient, private store: Store<fromApp.AppState>, private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.initTranslation();
    this.initBaseLayers();
  }

  private initTranslation() {
    this.translateService.addLangs(['en', 'fr']);
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
    if (document.location.href.includes(environment.frenchLanguageIdentifier)) {
      this.translateService.use('fr');
    }
  }

  private initBaseLayers() {
    for (const code of environment.backgroundLayerCodes) {
      this.translateService.get('language').subscribe((lang) => {
        this.httpClient.get<Layer>(`${environment.mapapiUrl}/layers/getLayerForCode?` +
          `code=${code}&language-code=${lang}`)
          .subscribe((layer: Layer) => {
            this.store.dispatch(new baseLayerActions.AddBaseLayer(layer));
            if (layer.code === 'bing.aerial') {
              this.store.dispatch(new baseLayerActions.SetCurrentBaseLayer(layer));
            }
          });
      });
    }
  }
}
