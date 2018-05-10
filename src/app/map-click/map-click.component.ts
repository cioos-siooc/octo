import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import * as fromMapClick from './store/map-click.reducers';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-map-click',
  templateUrl: './map-click.component.html',
  styleUrls: ['./map-click.component.css']
})
export class MapClickComponent implements OnInit {
  mapClickState: Observable<fromMapClick.State>;
  mapClickInfo: any;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.mapClickState = this.store.select('mapClick');
    this.mapClickState.subscribe((state) => {
      this.mapClickInfo = state.mapClickInfo;
    });
  }

}
