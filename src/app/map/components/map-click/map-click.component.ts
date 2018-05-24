import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {cloneDeep} from 'lodash';
import {MapState, selectMapClickState} from '../../store/reducers/map.reducers';

@Component({
  selector: 'app-map-click',
  templateUrl: './map-click.component.html',
  styleUrls: ['./map-click.component.css']
})
export class MapClickComponent implements OnInit {
  mapClickInfo: any;

  constructor(private store: Store<MapState>) {
  }

  ngOnInit() {
    this.store.select(selectMapClickState).subscribe((state) => {
      const clonedState = cloneDeep(state);
      this.mapClickInfo = clonedState.mapClickInfo;
    });
  }

}
