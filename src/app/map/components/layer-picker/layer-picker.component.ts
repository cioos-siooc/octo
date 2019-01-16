import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngrx/store';

import {Topic} from '@app/shared/models';
import {MapState} from '../../store';
import {SetSelectedTopic} from '@app/map/store/actions/topic.actions';
import {selectTopicState} from '@app/map/store/selectors/topic.selectors';
import {RemoveAllCategories} from '@app/map/store/actions/category.actions';


@Component({
  selector: 'app-layer-picker',
  templateUrl: './layer-picker.component.html',
  styleUrls: ['./layer-picker.component.css']
})
export class LayerPickerComponent implements OnInit {
  selectedTopic: Topic;

  constructor(private store: Store<MapState>, private modalService: NgbModal) { }

  ngOnInit() {
    this.store.select(selectTopicState).subscribe(
      state => this.selectedTopic = state.selectedTopic
    );
  }

  open(content) {
    this.modalService.open(content, { windowClass: 'layer-picker-modal'}).result.then(
      (result) => {
        // Called when the modal is closed with the modal.close() function

      }, (reason) => {
        // Called when the modal is closed any other way
        this.store.dispatch(new SetSelectedTopic(null));
        this.store.dispatch(new RemoveAllCategories());
      }
    );
  }

  backToThemes() {
    this.store.dispatch(new SetSelectedTopic(null));
    this.store.dispatch(new RemoveAllCategories());
  }
}
