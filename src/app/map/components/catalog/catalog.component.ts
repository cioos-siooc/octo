import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import * as fromApp from '../../../store/app.reducers';
import * as fromCatalog from './store/catalog.reducers';
import * as catalogActions from './store/catalog.actions';
import {Topic} from '../../../shared/topic.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  catalogState: Observable<fromCatalog.State>;
  numExpandedTopics: number;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.catalogState = this.store.select('catalog');
    this.catalogState.subscribe(state => {
      this.numExpandedTopics = 0;
      for (const topic of state.topics) {
        if (topic.expanded) {
          this.numExpandedTopics += 1;
        }
      }
    });
  }

  onClickTopic(id: number, topic: Topic) {
    this.store.dispatch(new catalogActions.SetTopicExpanded({
      topicIndex: id,
      expanded: !topic.expanded
    }));
  }
}
