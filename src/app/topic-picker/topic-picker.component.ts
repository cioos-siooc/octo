import {Component, OnInit} from '@angular/core';

import * as fromCatalog from '../catalog/store/catalog.reducers';
import * as catalogActions from '../catalog/store/catalog.actions';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {Topic} from '../shared/topic.model';

@Component({
  selector: 'app-topic-picker',
  templateUrl: './topic-picker.component.html',
  styleUrls: ['./topic-picker.component.css']
})
export class TopicPickerComponent implements OnInit {
  catalogState: Observable<fromCatalog.State>;

  constructor(private store: Store<fromCatalog.AppState>) {
  }

  ngOnInit() {
    this.catalogState = this.store.select('catalog');
    this.store.dispatch(new catalogActions.FetchTopicGroup(5));
  }

  onClickTopic(id: number, topic: Topic) {
    this.store.dispatch(new catalogActions.SetTopicExpanded({
      topicIndex: id,
      expanded: !topic.expanded
    }));
  }
}
