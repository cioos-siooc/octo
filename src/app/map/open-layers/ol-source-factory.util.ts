import {Layer} from '../../shared/layer.model';
import {BingLayer} from '../../shared/bing-layer.model';
import Source from 'ol/source/source';
import TileWMS from 'ol/source/tilewms';
import BingMapsSource from 'ol/source/bingmaps';
import {WmsLayer} from '../../shared/wms-layer.model';

export class OLSourceFactory {

  public static generateSource(layer: Layer) {
    let source: Source;
    if (layer.type === 'bing') {
      source = this.generateBingMapsSource(<BingLayer>layer);
    } else if (layer.type === 'wms') {
      source = this.generateTileWMSSource(<WmsLayer>layer);
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
    const wmsSource = new TileWMS(sourceParams);
    // TODO: implement url_parameters
    return wmsSource;
  }
}
