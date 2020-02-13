import { Injectable } from '@angular/core';
import OLMap from 'ol/map';

export class MapService {
    map: OLMap;

    constructor() { }

    setMap(map: OLMap) {
        this.map = map;
    }

    getMap(): OLMap {
        return this.map;
    }

    getOLLayerForLayerId(layerId: Number) {
        return this.map.getLayers().getArray().find((l) => {
            return l.get('id') === layerId;
        });
    }
}