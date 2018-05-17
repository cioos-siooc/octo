import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-map-click',
  templateUrl: './map-click.component.html',
  styleUrls: ['./map-click.component.css']
})
export class MapClickComponent implements OnInit {
  mapClickInfo: any;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.store.select('mapClick').subscribe((state) => {
      const clonedState = cloneDeep(state);
      this.mapClickInfo = clonedState.mapClickInfo;
    });
  }

}
