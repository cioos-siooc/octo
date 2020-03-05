/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorHandlerFactory, Mode} from '@app/map/utils';
import {TimeHandler} from '@app/map/utils';
import {MapState} from '@app/map/store';

@Component({
  selector: 'app-time-behavior',
  templateUrl: './time-behavior.component.html',
  styleUrls: ['./time-behavior.component.css']
})
export class TimeBehaviorComponent implements OnInit, OnDestroy {
  @Input() behavior: any;
  sync: boolean;
  currentDate: Date;
  Mode: any;

  constructor(private store: Store<MapState>, private translateService: TranslateService,
              private behaviorHandlerFactory: BehaviorHandlerFactory) {
  }

  onNowClick() {
    const bH = <TimeHandler>this.behaviorHandlerFactory.getBehaviorHandler(this.behavior.handler);
    bH.toggleNow(this.behavior);
  }

  onCloseDatetimePicker() {
    const bH = <TimeHandler>this.behaviorHandlerFactory.getBehaviorHandler(this.behavior.handler);
    const updatedBehavior = {
      ...this.behavior,
      currentDate: this.currentDate,
      mode: Mode.custom
    };
    bH.setNowOff(updatedBehavior);
    bH.updateBehaviorDateTime(updatedBehavior);
  }

  onSyncClick(e: any) {
    this.sync = e.target.checked;
    const bh = <TimeHandler>this.behaviorHandlerFactory.getBehaviorHandler(this.behavior.handler);
    bh.toggleSync(this.behavior, this.sync);
  }

  ngOnInit() {
    this.Mode = Mode;
  }

  ngOnDestroy() {
  }
}
