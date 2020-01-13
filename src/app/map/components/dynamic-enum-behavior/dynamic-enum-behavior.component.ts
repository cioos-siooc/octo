import { Component, Input, OnInit } from '@angular/core';
import { DynamicEnumHandler } from '@app/map/utils';
import { Store } from '@ngrx/store';
import { MapState } from '@app/map/store';
import { MapService } from '@app/map/utils/open-layers';
import { selectBehaviorState } from '@app/map/store/selectors/behavior.selectors';

@Component({
  selector: 'app-dynamic-enum-behavior',
  templateUrl: './dynamic-enum-behavior.component.html',
  styleUrls: ['./dynamic-enum-behavior.component.css']
})
export class DynamicEnumBehaviorComponent implements OnInit {
  behavior: any;
  @Input() private behaviorUniqueId;

  possibilities: any[];
  currentPossibility: any;

  constructor(private store: Store<MapState>, private dynamicEnumHandler: DynamicEnumHandler, private mapService: MapService) { }

  onSelectPossibility() {
    this.behavior.currentValue = this.currentPossibility;
    this.dynamicEnumHandler.updateParameter(this.behavior);
  }

  clearSelection() {
    this.currentPossibility = undefined;
    this.behavior.currentValue = undefined;
    this.dynamicEnumHandler.updateParameter(this.behavior);
  }

  ngOnInit() {
    // Setup a subscription to update possibilities if the behaviors change(ie. when another behavior is modified)
    this.store.select(selectBehaviorState).subscribe((behaviorState) => {
      this.behavior = behaviorState.behaviors.find(b => b.uniqueId === this.behaviorUniqueId);
      this.dynamicEnumHandler.getPossibilities(this.behavior).then((possibilities: any[]) => {
        if (typeof(this.behavior) != null) {
          this.possibilities = possibilities;
        }
      });
      if (typeof(this.behavior.currentValue) !== 'undefined') {
        this.currentPossibility = this.behavior.currentValue;
      }
    });
  }

}
