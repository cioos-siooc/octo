import OLLayer from 'ol/layer/vector';
import OLFeature from 'ol/feature';
import Style from 'ol/style/style';
import { Layer } from '@app/shared/models';
import { BaseStyler } from './base.styler';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MapState, selectMapClickByLayerId } from '@app/map/store';
import { StylesFromLiterals } from '../../styles-from-literals.util';
import { MapClickInfo } from '../../../../shared/models/map-click-info.model';
import { MapService } from '../map.service';
import VectorLayer from 'ol/layer/vector';
import Circle from 'ol/style/circle';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';

@Injectable({ providedIn: 'root' })
export class ECCCMapboxStyler extends BaseStyler {
    private layers: {} = {};
    private pointLayer: Layer;
    private polygonLayer: Layer;

    constructor(private store: Store<MapState>, private mapService: MapService) { super(); }

    setOLVectorLayerStyle(layer: Layer, olLayer: OLLayer) {
        const styleDef = layer.currentClientPresentation.styleDef;
        if (styleDef != null) {
            const stylesFromLiteralsService = new StylesFromLiterals(styleDef);
            if ( !( layer.id in this.layers ) ) {
                // needs a if to choose if it's a point or a polygon
                if (styleDef.type === 'unique') {
                this.initPointLayerSubscription(layer, olLayer);    // MAYBE NEED TO MODIFY THE CONDITIONAL BUT WILL WORK FOR NOW
                } else if (styleDef.type === 'single') {
                this.initPolygonLayerSubscription(layer, olLayer);
                }
            }
            // olLayer.setStyle((feature: OLFeature, resolution) => {
            //     return [stylesFromLiteralsService.getFeatureStyle(feature, resolution)];
            // });
        }
    }

    initPointLayerSubscription(layer: Layer, olLayer: OLLayer) {
        if ( !( layer.id in this.layers ) ) {
            const styleDef = layer.currentClientPresentation.styleDef;
            const stylesFromLiteralsService = new StylesFromLiterals(styleDef);
            this.layers[layer.id] = this.store.select(selectMapClickByLayerId(layer.id)).subscribe(
                (mapClick: MapClickInfo) => {
                    const map = this.mapService.getMap();
                    const newOlLayer = map.getLayers().getArray().find((l) => {
                        return l.get('id') === layer.id;
                    });
                    if (newOlLayer) {
                        (<VectorLayer>newOlLayer).setStyle((feature: OLFeature, resolution) => {
                            if (feature.getId() === mapClick.result.featureId) {
                                return new Style({
                                    image: new Circle({
                                        fill: new Fill({color: '#FF5733'}),
                                        stroke: new Stroke({
                                            color: '#000000',
                                            width: 1
                                        }),
                                        radius: 10
                                    }),
                                });
                            } else {
                                return [stylesFromLiteralsService.getFeatureStyle(feature, resolution)];
                            }
                        });
                    }
                }
            );
        }
    }
    initPolygonLayerSubscription(layer: Layer, olLayer: OLLayer) {
        if ( !( layer.id in this.layers ) ) {
            const styleDef = layer.currentClientPresentation.styleDef;
            const stylesFromLiteralsService = new StylesFromLiterals(styleDef);
        }
    }
}
