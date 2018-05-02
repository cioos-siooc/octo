import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Layer} from '../../shared/layer.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-time-behavior',
  templateUrl: './time-behavior.component.html',
  styleUrls: ['./time-behavior.component.css']
})
export class TimeBehaviorComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {
  }

  private _layer: Layer;

  get layer(): Layer {
    return this._layer;
  }

  @Input()
  set layer(layer: Layer) {
    this._layer = layer;
  }

  private _behavior: any;

  get behavior(): any {
    return this._behavior;
  }

  @Input()
  set behavior(behavior: any) {
    this._behavior = behavior;
    // TODO: subscribe to this specific behavior and update UI accordingly?
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
