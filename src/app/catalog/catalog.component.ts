import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromCatalog from './store/catalog.reducers';
import * as catalogActions from './store/catalog.actions';
import * as layerActions from '../map/store/layer.actions';
import { Topic } from '../shared/topic.model';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  catalogState: Observable<fromCatalog.State>;
  numExpandedTopics: number;

  constructor(
    private store: Store<fromCatalog.AppState>
  ) {}

  ngOnInit() {
    this.catalogState = this.store.select('catalog');
    this.catalogState.subscribe(state => {
      this.numExpandedTopics = 0;
      for (const topic of state.topics) {
        if (topic.expanded) { this.numExpandedTopics += 1; }
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
