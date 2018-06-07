import {Component, OnInit} from '@angular/core';
import {environment} from '@env/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.initTranslation();
  }

  private initTranslation() {
    this.translateService.addLangs(['en', 'fr']);
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
    if (document.location.href.includes(environment.frenchLanguageIdentifier)) {
      this.translateService.use('fr');
    }
  }

}
