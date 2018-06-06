import {Component, OnInit} from '@angular/core';
import * as fromCatalog from '../../store/reducers/catalog.reducers';
import * as catalogActions from '../../store/actions/catalog.actions';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Topic} from '../../../shared/models/topic.model';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../../environments/environment';
import {MapState} from '../../store';
import {selectCatalogState} from '../../store/selectors/catalog.selectors';

@Component({
  selector: 'app-topic-picker',
  templateUrl: './topic-picker.component.html',
  styleUrls: ['./topic-picker.component.css']
})
export class TopicPickerComponent implements OnInit {
  catalogState: Observable<fromCatalog.CatalogState>;

  constructor(private store: Store<MapState>, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.catalogState = this.store.select(selectCatalogState);
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
