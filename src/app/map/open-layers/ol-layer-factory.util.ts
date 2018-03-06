import {Layer} from "../../shared/layer.model";
import {OLSourceFactory} from "./ol-source-factory.util";
import OLLayer from 'ol/layer/layer'
import Source from 'ol/source/source'
import TileSource from 'ol/source/tile'
import TileLayer from 'ol/layer/tile'

export class OLLayerFactory {
  public static generateLayer(layer: Layer): OLLayer {
    let olLayer: OLLayer;
    if (layer.type === "bing" || layer.type === "wms") {
      olLayer = this.generateTileLayer(layer);
    }
    olLayer.setZIndex(layer.zIndex);
    return olLayer;
  }

  private static generateTileLayer(layer: Layer): OLLayer {
    let source: Source = OLSourceFactory.generateSource(layer);
    let olLayer: OLLayer = new TileLayer({source: <TileSource>source});
    this.setOLLayerProperties(olLayer, layer);
    return olLayer;
  }

  private static setOLLayerProperties(olLayer: OLLayer, layer: Layer) {
    olLayer.set('id', layer.id);
    olLayer.set('code', layer.code);
    olLayer.set('uniqueId', layer.uniqueId);
  }
}

