/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorHandlerFactory} from '@app/map/utils';
import {TimeHandler} from '@app/map/utils';
import {MapState} from '@app/map/store';
import {selectBehaviorState} from '@app/map/store/selectors/behavior.selectors';
import { MapService } from '@app/map/utils/open-layers';

@Component({
  selector: 'app-time-behavior',
  templateUrl: './time-behavior.component.html',
  styleUrls: ['./time-behavior.component.css']
})
export class TimeBehaviorComponent implements OnInit, OnDestroy {
  behavior: any;
  currentDate: Date;

  constructor(private store: Store<MapState>, private translateService: TranslateService, private behaviorHandlerFactory: BehaviorHandlerFactory) {
  }

  private _behaviorUniqueId: string;

  get behaviorUniqueId(): string {
    return this._behaviorUniqueId;
  }

  @Input()
  set behaviorUniqueId(id: string) {
    this._behaviorUniqueId = id;
    this.store.select(selectBehaviorState).subscribe((behaviorState) => {
      this.behavior = behaviorState.behaviors.find(b => b.uniqueId === id);
      if (this.behavior != null) {
        this.currentDate = this.behavior.currentDate;
      }
    });
  }

  onNowClick() {
    const bH = <TimeHandler>this.behaviorHandlerFactory.getBehaviorHandler(this.behavior.handler);
    bH.toggleNow(this.behavior);
  }

  onCloseDatetimePicker() {
    const bH = <TimeHandler>this.behaviorHandlerFactory.getBehaviorHandler(this.behavior.handler);
    const updatedBehavior = {
      ...this.behavior,
      currentDate: this.currentDate
    };
    bH.setNowOff(updatedBehavior);
    bH.updateBehaviorDateTime(updatedBehavior);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
