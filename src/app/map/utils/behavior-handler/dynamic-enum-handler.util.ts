import { Store } from '@ngrx/store';
import { MapState, selectLayerState, selectBehaviorState } from '@app/map/store';
import { EnumHandler } from '@app/map/utils/behavior-handler/enum-handler.util';
import { MapService } from '@app/map/services/map.service';
import OLLayer from 'ol/layer/layer';
import VectorSource from 'ol/source/vector';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { UrlParametersUtil } from '@app/map/utils/url-parameters.util';
import * as fromBehaviorActions from '@app/map/store/actions/behavior.actions';
import * as fromLayerActions from '@app/map/store/actions/layer.actions';
import { BehaviorState } from '@app/map/store/reducers/behavior.reducers';

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
    
    updateParameter(behavior) {
        this.store.select(selectLayerState).pipe(take(1)).subscribe((layerState) => {
            const layer = layerState.layers.find(l => l.id === behavior.layerId);
        
            let urlParameters = undefined;
            if (behavior.parameterType && behavior.parameterType === 'cql') {
                this._handleCQLArgument(behavior, layer).then((urlParameters) => {
                    this._changeLayerUrlParameters(layer, urlParameters);
                    this.store.dispatch(new fromBehaviorActions.UpdateBehavior(behavior));
                });
                // urlParameters = this._handleArgument(behavior, layer);
            } else {
                urlParameters = this._handleArgument(behavior, layer);
                this._changeLayerUrlParameters(layer, urlParameters);
                this.store.dispatch(new fromBehaviorActions.UpdateBehavior(behavior));
            }
            
        });
    }

    _handleArgument(behavior, layer) {
        const parameterName = this._getParameterName(behavior);
        const currentValue = this._getParameterValue(behavior);

        let urlParameters = layer.urlParameters;
        if (typeof(currentValue) !== 'undefined') {
            urlParameters = UrlParametersUtil.addUrlParameter(urlParameters, parameterName, currentValue);
        } else {
            urlParameters = UrlParametersUtil.removeUrlParameter(urlParameters, parameterName);
        }
        return urlParameters;
    }

    _handleCQLArgument(behavior, layer) {
        let urlParameters = layer.urlParameters;
        if (typeof(urlParameters) === 'undefined') {
            urlParameters = [];
        }

        const promise: Promise<any[]> = new Promise((resolve, reject) => {
            this.store.select(selectBehaviorState).pipe(take(1)).subscribe((behaviorState: BehaviorState) => {
                const cqlBehaviors = behaviorState.behaviors.filter((behavior) => {
                    if (behavior.handler === 'dynamic-enum' && behavior.parameterType && behavior.parameterType === 'cql') {
                        if (typeof(behavior.currentValue) !== 'undefined') {
                            return true;
                        }
                    }
                    return false;
                });
                const filterParts = cqlBehaviors.map((behavior) => {
                    const parameterName = this._getParameterName(behavior);
                    const parameterValue = this._getParameterValue(behavior);
                    return parameterName + '=' + parameterValue;
                });
                const cqlFilter = filterParts.join(' AND ');
                if (cqlFilter !== '') {
                    urlParameters = UrlParametersUtil.addUrlParameter(urlParameters, 'cql_filter', cqlFilter);
                } else {
                    urlParameters = UrlParametersUtil.removeUrlParameter(urlParameters, 'cql_filter');
                }
                resolve(urlParameters);
            });
        });
        return promise;
    }

    _changeLayerUrlParameters(layer, urlParameters) {
        const updatedLayer = {
            ...layer,
            urlParameters: urlParameters
        };
        this.store.dispatch(new fromLayerActions.UpdateLayer(updatedLayer));
    }
}