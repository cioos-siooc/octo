import {Layer} from '../../shared/layer.model';
import {BingLayer} from '../../shared/bing-layer.model';
import Source from 'ol/source/source';
import TileWMS from 'ol/source/tilewms';
import BingMapsSource from 'ol/source/bingmaps';
import GeoJSONFormat from 'ol/format/geojson';
import VectorSource from 'ol/source/vector';
import {WmsLayer} from '../../shared/wms-layer.model';
import {WfsLayer} from '../../shared/wfs-layer.model';

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
    // TODO: implement url_parameters
    return new TileWMS(sourceParams);
  }

  private static generateVectorSourceForGeojson(layer: Layer) {
    const sourceParams: any = {};
    sourceParams.url = layer.url;
    sourceParams.format = new GeoJSONFormat();

    // TODO : implement url_parameters
    return new VectorSource(sourceParams);
  }

  private static generateVectorSourceForWfs(layer: WfsLayer) {
    const sourceParams: any = {};
    sourceParams.format = new GeoJSONFormat();
    sourceParams.url = this.generateWfsUrl(layer);

    // TODO : implement url_parameters
    return new VectorSource(sourceParams);
  }

  // noinspection TsLint
  private static generateWfsUrl(layer: WfsLayer) {
    return `${layer.url}?service=WFS&version=${layer.version}&typeName=${layer.identifier}&request=GetFeature&outputFormat=application/json&srsname=${layer.crs}`;
  }
}
