import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngrx/store';

import {Topic} from '@app/shared/models';
import {MapState} from '../../store';
import {selectTopicState} from '@app/map/store/selectors/topic.selectors';


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
    this.modalService.open(content);
  }

}
