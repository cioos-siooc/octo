import {Component, OnInit} from '@angular/core';

import * as fromApp from '../store/app.reducers';
import * as fromCatalog from '../catalog/store/catalog.reducers';
import * as catalogActions from '../catalog/store/catalog.actions';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Topic} from '../shared/topic.model';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-topic-picker',
  templateUrl: './topic-picker.component.html',
  styleUrls: ['./topic-picker.component.css']
})
export class TopicPickerComponent implements OnInit {
  catalogState: Observable<fromCatalog.State>;

  constructor(private store: Store<fromApp.AppState>, private translateService: TranslateService ) {
  }

  ngOnInit() {
    this.catalogState = this.store.select('catalog');
    this.translateService.get('language').subscribe((lang) => {
      this.store.dispatch(new catalogActions.FetchTopicGroup({languageCode: lang, code: environment.topicGroupCode}));
    });
  }

  onClickTopic(id: number, topic: Topic) {
    this.store.dispatch(new catalogActions.SetTopicExpanded({
      topicIndex: id,
      expanded: !topic.expanded
    }));
  }
}
