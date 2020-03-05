/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { Injectable } from '@angular/core';

import {Layer} from '@app/shared/models';
import {OLSourceFactory} from './ol-source-factory.util';
import OLLayer from 'ol/layer/layer';
import Source from 'ol/source/source';
import TileSource from 'ol/source/tile';
import TileLayer from 'ol/layer/tile';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import {StylesFromLiterals} from '../styles-from-literals.util';
import { stylers } from './stylers';
import { StylerService } from './styler.service';
import { LoadingService } from '@app/map/services/loading.service';

@Injectable()
export class OLLayerFactory {
  constructor(private stylerService: StylerService, private loadingService: LoadingService) {}

  public generateLayer(layer: Layer): OLLayer {
    let olLayer: OLLayer;
    if (layer.type === 'bing' || layer.type === 'wms') {
      olLayer = this.generateTileLayer(layer);
    } else if (layer.type === 'geojson' || layer.type === 'wfs') {
      olLayer = this.generateVectorLayer(layer);
    }
    olLayer.setZIndex(layer.priority);
    return olLayer;
  }

  private generateTileLayer(layer: Layer): OLLayer {
    const source: Source = OLSourceFactory.generateSource(layer);
    const olLayer: OLLayer = new TileLayer({source: <TileSource>source});
    this.setOLLayerProperties(olLayer, layer);
    const loadingService = this.loadingService;
    const listenerKey = source.once('tileloadend', function() {
      if (source.getState() === 'ready') {
        loadingService.hide();
      }
    });
    return olLayer;
  }

  private setOLLayerProperties(olLayer: OLLayer, layer: Layer) {
    olLayer.set('id', layer.id);
    olLayer.set('code', layer.code);
    olLayer.set('layerType', layer.type);
    olLayer.set('opacity', layer.opacity);
    olLayer.set('visible', layer.isVisible);
  }

  private generateVectorLayer(layer: Layer) {
    const source: Source = OLSourceFactory.generateSource(layer);
    const olLayer: OLLayer = new VectorLayer({source: <VectorSource>source});
    this.setOLLayerProperties(olLayer, layer);

    let styler = undefined;
    if (typeof(layer.currentClientPresentation.styler) !== 'undefined') {
      styler = this.stylerService.getStyler(layer.currentClientPresentation.styler);
    } else {
      styler = this.stylerService.getStyler('slgo-mapbox');
    }
    styler.setOLVectorLayerStyle(layer, olLayer);
    const loadingService = this.loadingService;
    const listenerKey = source.once('change', function() {
      if (source.getState() === 'ready') {
        loadingService.hide();
      }
    });
    return olLayer;
  }
}
