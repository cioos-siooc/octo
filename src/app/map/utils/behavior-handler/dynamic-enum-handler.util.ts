import { Store } from '@ngrx/store';
import { MapState } from '@app/map/store';
import { BehaviorHandler } from '@app/map/utils';
import { EnumHandler } from '@app/map/utils/behavior-handler/enum-handler.util';
import { MapService } from '@app/map/utils/open-layers';
import OLLayer from 'ol/layer/layer';
import VectorSource from 'ol/source/vector';
import { UpdateBehavior } from '../../store/actions/behavior.actions';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DynamicEnumHandler extends EnumHandler {
    type = 'dynamic-enum';

    constructor(protected store: Store<MapState>, private mapService: MapService) {
        super(store);
    }

    getPossibilities(behavior: any): Promise<any[]> {
        const promise: Promise<any[]> = new Promise((resolve, reject) => {
            const OLlayer = <OLLayer> this.mapService.getOLLayerForLayerId(2709);
            const OLSource = <VectorSource> OLlayer.getSource();

            if (OLSource.getFeatures().length < 1) {
                OLSource.once('change', (event) => {
                    if (OLSource.getState() === 'ready') {
                        resolve(this._getPossibilities(behavior, OLSource));
                    }
                });
            } else {
                resolve(this._getPossibilities(behavior, OLSource));
            }
        });
        return promise;
    }

    _getPossibilities(behavior: any, OLSource: VectorSource) {
        const properties = OLSource.getFeatures()[0].getKeys();
        const possibleValues = [];
        if ( properties.includes(behavior.parameterName) ) {
            OLSource.getFeatures().forEach((feature, index) => {
                const propertyValue = feature.getProperties()[behavior.parameterName];
                if ( !(possibleValues.includes(propertyValue)) ) {
                    possibleValues.push(propertyValue);
                }
            });
        } else {
            throw( 'dynamic-enum-handler: ' + behavior.parameterName + ' not found in features for layer' );
        }
        return possibleValues;
    }
}