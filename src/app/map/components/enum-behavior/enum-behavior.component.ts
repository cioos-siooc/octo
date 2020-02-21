/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, Input, OnInit} from '@angular/core';
import {MapState, selectBehaviorState} from '@app/map/store';
import {Store} from '@ngrx/store';
import {BehaviorHandlerFactory} from '@app/map/utils';
import {EnumHandler} from '@app/map/utils/behavior-handler/enum-handler.util';
import { MapService } from '@app/map/utils/open-layers';

@Component({
  selector: 'app-enum-behavior',
  templateUrl: './enum-behavior.component.html',
  styleUrls: ['./enum-behavior.component.css']
})
export class EnumBehaviorComponent implements OnInit {

  @Input() behavior: any;
  currentPossibility: Possibility;

  constructor(private store: Store<MapState>, private behaviorHandlerFactory: BehaviorHandlerFactory) {
  }

  ngOnInit() {
    if (this.behavior != null && this.behavior.currentValue != null) {
      this.currentPossibility = this.behavior.possibilities.find(p => p.value === this.behavior.currentValue);
    }
  }

  onSelectPossibility() {
    this.behavior.currentValue = this.currentPossibility.value;
    const bH = <EnumHandler>this.behaviorHandlerFactory.getBehaviorHandler(this.behavior.handler);
    bH.updateParameter(this.behavior);
  }

  comparePossibilities(possibility1: Possibility, possibility2: Possibility) {
    return possibility1 && possibility2 ? possibility1.value === possibility2.value : possibility1 === possibility2;
  }
}

interface Possibility {
  label: string;
  value: string;
  isDefault: boolean;
}
