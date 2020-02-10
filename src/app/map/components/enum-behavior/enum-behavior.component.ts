/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, Input, OnInit} from '@angular/core';
import {MapState, selectBehaviorState} from '@app/map/store';
import {Store} from '@ngrx/store';
import {cloneDeep} from 'lodash';
import {BehaviorHandlerFactory} from '@app/map/utils';
import {EnumHandler} from '@app/map/utils/behavior-handler/enum-handler.util';
import { MapService } from '@app/map/utils/open-layers';

@Component({
  selector: 'app-enum-behavior',
  templateUrl: './enum-behavior.component.html',
  styleUrls: ['./enum-behavior.component.css']
})
export class EnumBehaviorComponent implements OnInit {

  behavior: any;
  currentPossibility: Possibility;

  constructor(private store: Store<MapState>, private behaviorHandlerFactory: BehaviorHandlerFactory) {
  }

  private _behaviorUniqueId: string;

  get behaviorUniqueId(): string {
    return this._behaviorUniqueId;
  }

  @Input()
  set behaviorUniqueId(id: string) {
    this._behaviorUniqueId = id;
    this.initComponentState();
  }

  ngOnInit() {
  }

  onSelectPossibility() {
    this.behavior.currentValue = this.currentPossibility.value;
    const bH = <EnumHandler>this.behaviorHandlerFactory.getBehaviorHandler(this.behavior.handler);
    bH.updateParameter(this.behavior);
  }

  comparePossibilities(possibility1: Possibility, possibility2: Possibility) {
    return possibility1 && possibility2 ? possibility1.value === possibility2.value : possibility1 === possibility2;
  }

  private initComponentState() {
    this.store.select(selectBehaviorState).subscribe((behaviorState) => {
      const behaviorStateCopy = cloneDeep(behaviorState);
      this.behavior = behaviorStateCopy.behaviors.find(b => b.uniqueId === this._behaviorUniqueId);
      if (this.behavior != null && this.behavior.currentValue != null) {
        this.currentPossibility = this.behavior.possibilities.find(p => p.value === this.behavior.currentValue);
      }
    });
  }
}

interface Possibility {
  label: string;
  value: string;
  isDefault: boolean;
}
