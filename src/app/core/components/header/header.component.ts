/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '@env/environment';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {
  titleKey: string;

  constructor(private translateService: TranslateService, private config: NgbDropdownConfig) {
    config.placement = 'bottom-right';
  }

  onChangeLanguageClick() {
    if (this.translateService.currentLang === 'fr') {
      window.location.href = document.location.href.replace(environment.frenchLanguageIdentifier, environment.englishLanguageIdentifier);
    } else if (this.translateService.currentLang === 'en') {
      window.location.href = document.location.href.replace(environment.englishLanguageIdentifier, environment.frenchLanguageIdentifier);
    }
  }

  ngOnInit() {
    this.titleKey = environment.titleKey;
  }
}
