/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Layer} from '../../../shared/models/layer.model';
import {BingLayer} from '../../../shared/models/bing-layer.model';
import Source from 'ol/source/source';
import TileWMS from 'ol/source/tilewms';
import BingMapsSource from 'ol/source/bingmaps';
import GeoJSONFormat from 'ol/format/geojson';
import VectorSource from 'ol/source/vector';
import {WmsLayer} from '../../../shared/models/wms-layer.model';
import {WfsLayer} from '../../../shared/models/wfs-layer.model';

export class OLSourceFactory {

  public static generateSource(layer: Layer) {
    let source: Source;
    if (layer.type === 'bing') {
      source = this.generateBingMapsSource(<BingLayer>layer);
    } else if (layer.type === 'wms') {
      source = this.generateTileWMSSource(<WmsLayer>layer);
    } else if (layer.type === 'geojson') {
      source = this.generateVectorSourceForGeojson(layer);
    } else if (layer.type === 'wfs') {
      source = this.generateVectorSourceForWfs(<WfsLayer>layer);
    }
    return source;
  }

  private static generateBingMapsSource(layer: BingLayer): Source {
    return new BingMapsSource({
      key: layer.key,
      imagerySet: layer.imagerySet
    });
  }

  private static generateTileWMSSource(layer: WmsLayer): Source {
    const sourceParams: any = {};
    sourceParams.url = layer.url;
    sourceParams.projection = layer.crs;
    sourceParams.params = {
      FORMAT: layer.format,
      VERSION: layer.version,
      LAYERS: layer.identifier,
    };
    this.setWMSStyle(layer, sourceParams.params);
    // TODO: implement url_parameters
    // TODO: for each static parameter add a sourceParams.params entry
    return new TileWMS(sourceParams);
  }

  private static generateVectorSourceForGeojson(layer: Layer) {
    const sourceParams: any = {};
    sourceParams.url = this.addParamsToUrl(layer.url, layer.urlParameters);
    sourceParams.format = new GeoJSONFormat();

    return new VectorSource(sourceParams);
  }

  private static generateVectorSourceForWfs(layer: WfsLayer) {
    const sourceParams: any = {};
    sourceParams.format = new GeoJSONFormat();
    sourceParams.url = this.addParamsToUrl(this.generateWfsUrl(layer), layer.urlParameters);

    return new VectorSource(sourceParams);
  }

  private static generateWfsUrl(layer: WfsLayer) {
    return `${layer.url}?service=WFS&version=${layer.version}&typeName=${layer.identifier}` +
      `&request=GetFeature&outputFormat=application/json&srsname=${layer.crs}`;
  }

  private static setWMSStyle(layer: WmsLayer, params: any) {
    if (layer.currentClientPresentation != null && layer.currentClientPresentation.namedStyle != null) {
      params['STYLES'] = layer.currentClientPresentation.namedStyle;
    }
  }

  private static addParamsToUrl(url: string, urlParameters: any): string {
    if (urlParameters != null) {
      urlParameters.forEach((urlParam) => {
        const paramName = Object.keys(urlParam)[0];
        const paramValue = urlParam[Object.keys(urlParam)[0]];
        url = this.updateQueryString(paramName, paramValue, url);
      });
    }
    return url;
  }
  public static updateQueryString(key, value, url): any {
    const re = new RegExp('([?&])' + key + '=.*?(&|#|$)(.*)', 'gi');
    let hash = '';

    if (re.test(url)) {
    if (typeof value !== 'undefined' && value !== null) {
      return url.replace(re, '$1' + key + '=' + value + '$2$3');
    } else {
      hash = url.split('#');
      url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
      if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
        url += '#' + hash[1];
      }
      return url;
    }
  } else {
      if (typeof value !== 'undefined' && value !== null) {
        const separator = url.indexOf('?') !== -1 ? '&' : '?';
        hash = url.split('#');
        url = hash[0] + separator + key + '=' + value;
        if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
          url += '#' + hash[1];
        }
        return url;
      } else {
      return url;
    }
    }
  }
}
