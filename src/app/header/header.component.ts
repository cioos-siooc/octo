import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  titleKey: string;

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
    this.titleKey = environment.titleKey;
  }
}
