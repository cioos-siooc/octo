import { Layer } from '@app/shared/models';
import OLLayer from 'ol/layer/layer';
import { StylesFromLiterals } from '../../styles-from-literals.util';
import VectorLayer from 'ol/layer/vector';
import { BaseStyler } from './base.styler';

export class SLGOMapboxStyler extends BaseStyler {
  static type: string = 'slgo-mapbox';

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