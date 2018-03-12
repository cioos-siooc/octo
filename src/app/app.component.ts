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
    this.translateService.setDefaultLang('fr');
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  private initBaseLayers() {
    for (const id of environment.backgroundLayerIds) {
      this.httpClient.get<Layer>(`${environment.mapapiUrl}/layers/${id}`).subscribe((layer: Layer) => {
        this.store.dispatch(new baseLayerActions.AddBaseLayer(layer));
        if (layer.code === 'bing.aerial') {
          this.store.dispatch(new baseLayerActions.SetCurrentBaseLayer(layer));
        }
      });
    }
  }
}
