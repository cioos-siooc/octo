import {Component, Input, OnInit} from '@angular/core';
import {MapState, selectBehaviorState} from '@app/map/store';
import {Store} from '@ngrx/store';
import {cloneDeep} from 'lodash';
import {BehaviorHandlerFactory} from '@app/map/utils';
import {EnumHandler} from '@app/map/utils/behavior-handler/enum-handler.util';

@Component({
  selector: 'app-enum-behavior',
  templateUrl: './enum-behavior.component.html',
  styleUrls: ['./enum-behavior.component.css']
})
export class EnumBehaviorComponent implements OnInit {

  constructor(private store: Store<MapState>) { }

  behavior: any;
  private _behaviorUniqueId: string;
  currentPossibility: Possibility;

  get behaviorUniqueId(): string {
    return this._behaviorUniqueId;
  }

  @Input()
  set behaviorUniqueId(id: string) {
    this._behaviorUniqueId = id;
    this.store.select(selectBehaviorState).subscribe((behaviorState) => {
      const behaviorStateCopy = cloneDeep(behaviorState);
      this.behavior = behaviorStateCopy.behaviors.find(b => b.uniqueId === this._behaviorUniqueId);
    });
  }
  ngOnInit() {
  }

  onSelectPossibility() {
    this.behavior.currentValue = this.currentPossibility.value;
    const bH = <EnumHandler>BehaviorHandlerFactory.getBehaviorHandler(this.behavior.handler, this.store);
    bH.updateParameter(this.behavior);
  }
}

interface Possibility {
  label: string;
  value: string;
}
