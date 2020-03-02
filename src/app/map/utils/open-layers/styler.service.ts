import { Injectable } from '@angular/core';
import { MapState } from '@app/map/store';
import { Store } from '@ngrx/store';
import { stylers } from './stylers';
import { ECCCMapboxStyler } from './stylers/eccc-mapbox.styler';



@Injectable({providedIn: 'root'})
export class StylerService {
  stylers: {} = {};

  constructor(private store: Store<MapState>, private ecccMapboxStyler: ECCCMapboxStyler) { }

  public getStyler(stylerName: string) {
    if (stylerName === 'eccc-mapbox') {
      return this.ecccMapboxStyler;
    } else if (stylerName in stylers) {
      if (!(stylerName in this.stylers)) {
        this.stylers[stylerName] = new stylers[stylerName](this.store);
      }
    } else {
      throw "Styler: " + stylerName + ' not found.';
    }
    return this.stylers[stylerName];
  }
}