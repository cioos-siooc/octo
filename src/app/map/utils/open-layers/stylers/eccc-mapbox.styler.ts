import OLLayer from 'ol/layer/vector';
import VectorLayer from 'ol/layer/vector';
import { Store } from '@ngrx/store';

import { StylesFromLiterals } from '../../styles-from-literals.util';
import { BaseStyler } from "./base.styler";
import { Layer } from "@app/shared/models";
import { MapState } from '@app/map/store';

/**
 * Specialized styler for ECCC layers
 *  Allows for dynamic styling where a polygon layer
 *  In a layerGroup is filtered based on user interaction
 *  with a point layer in the same group. Also highlights
 *  Selected points
 *
 * @export
 * @class ECCCMapboxStyler
 * @extends {BaseStyler}
 */
export class ECCCMapboxStyler extends BaseStyler {
  static type: string = 'eccc-mapbox';

  constructor(private store: Store<MapState>) { super() }

  public setOLVectorLayerStyle(layer: Layer, olLayer: OLLayer) {
    if (layer.currentClientPresentation != null) {
      const styleDef = layer.currentClientPresentation.styleDef;
      if (styleDef != null) {
        const stylesFromLiteralsService = new StylesFromLiterals(styleDef);
        (<VectorLayer>olLayer).setStyle(function (feature, resolution) {
          return [stylesFromLiteralsService.getFeatureStyle(feature, resolution)];
        });
      }
    }
  }
}