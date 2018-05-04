import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Layer} from '../../shared/layer.model';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import * as fromApp from '../../store/app.reducers';
import {BehaviorHandlerFactory} from '../behavior-handler/behavior-handler-factory.util';
import {TimeHandler} from '../behavior-handler/time-handler.util';

@Component({
  selector: 'app-time-behavior',
  templateUrl: './time-behavior.component.html',
  styleUrls: ['./time-behavior.component.css']
})
export class TimeBehaviorComponent implements OnInit, OnDestroy {
  behavior: any;

  constructor(private store: Store<fromApp.AppState>, private translateService: TranslateService) {
  }

  private _layer: Layer;

  get layer(): Layer {
    return this._layer;
  }

  @Input()
  set layer(layer: Layer) {
    this._layer = layer;
  }

  private _behaviorUniqueId: string;

  get behaviorUniqueId(): string {
    return this._behaviorUniqueId;
  }

  @Input()
  set behaviorUniqueId(id: string) {
    this._behaviorUniqueId = id;
    this.store.select('behavior').subscribe((behaviorState) => {
      this.behavior = behaviorState.behaviors.find(b => b.uniqueId === id);
    });
  }

  onNowClick() {
    const bH = <TimeHandler>BehaviorHandlerFactory.getBehaviorHandler(this.behavior.handler, this.store);
    bH.toggleNow(this.behavior);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
