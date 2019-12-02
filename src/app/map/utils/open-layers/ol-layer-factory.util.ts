/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Layer} from '@app/shared/models';
import {OLSourceFactory} from './ol-source-factory.util';
import OLLayer from 'ol/layer/layer';
import Source from 'ol/source/source';
import TileSource from 'ol/source/tile';
import TileLayer from 'ol/layer/tile';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import {StylesFromLiterals} from '../styles-from-literals.util';

export class OLLayerFactory {
  public static generateLayer(layer: Layer): OLLayer {
    let olLayer: OLLayer;
    if (layer.type === 'bing' || layer.type === 'wms') {
      olLayer = this.generateTileLayer(layer);
    } else if (layer.type === 'geojson' || layer.type === 'wfs') {
      olLayer = this.generateVectorLayer(layer);
    }
    olLayer.setZIndex(layer.priority);
    return olLayer;
  }

  private static generateTileLayer(layer: Layer): OLLayer {
    const source: Source = OLSourceFactory.generateSource(layer);
    const olLayer: OLLayer = new TileLayer({source: <TileSource>source});
    this.setOLLayerProperties(olLayer, layer);
    return olLayer;
  }

  private static setOLLayerProperties(olLayer: OLLayer, layer: Layer) {
    olLayer.set('id', layer.id);
    olLayer.set('code', layer.code);
    olLayer.set('uniqueId', layer.uniqueId);
    olLayer.set('opacity', layer.opacity);
    olLayer.set('visible', layer.isVisible);
  }

  private static generateVectorLayer(layer: Layer) {
    const source: Source = OLSourceFactory.generateSource(layer);
    const olLayer: OLLayer = new VectorLayer({source: <VectorSource>source});
    this.setOLLayerProperties(olLayer, layer);
    this.setOLVectorLayerStyle(layer, olLayer);
    return olLayer;
  }

  private static setOLVectorLayerStyle(layer: Layer, olLayer) {
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
