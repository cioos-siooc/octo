import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import * as fromApp from '../../store/app.reducers';
import {BehaviorHandlerFactory} from '../behavior-handler/behavior-handler-factory.util';
import {TimeHandler} from '../behavior-handler/time-handler.util';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-time-behavior',
  templateUrl: './time-behavior.component.html',
  styleUrls: ['./time-behavior.component.css']
})
export class TimeBehaviorComponent implements OnInit, OnDestroy {
  behavior: any;
  currentDate: Date;

  constructor(private store: Store<fromApp.AppState>, private translateService: TranslateService) {
  }

  private _behaviorUniqueId: string;

  get behaviorUniqueId(): string {
    return this._behaviorUniqueId;
  }

  @Input()
  set behaviorUniqueId(id: string) {
    this._behaviorUniqueId = id;
    this.store.select('behavior').subscribe((behaviorState) => {
      const behaviorStateCopy = cloneDeep(behaviorState);
      this.behavior = behaviorStateCopy.behaviors.find(b => b.uniqueId === this._behaviorUniqueId);
      if (this.behavior != null) {
        this.currentDate = this.behavior.currentDate;
      }
    });
  }

  onNowClick() {
    const bH = <TimeHandler>BehaviorHandlerFactory.getBehaviorHandler(this.behavior.handler, this.store);
    bH.toggleNow(this.behavior);
  }

  onCloseDatetimePicker() {
    this.behavior.currentDate = this.currentDate;
    const bH = <TimeHandler>BehaviorHandlerFactory.getBehaviorHandler(this.behavior.handler, this.store);
    bH.setNowOff(this.behavior);
    bH.updateDateTime(this.behavior);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
