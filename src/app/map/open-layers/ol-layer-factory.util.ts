import {Layer} from "../../shared/layer.model";
import {OlSourceFactory} from "./ol-source-factory.util";
import OLLayer from 'ol/layer/layer'
import Source from 'ol/source/source'
import TileSource from 'ol/source/tile'
import TileLayer from 'ol/layer/tile'

export class OlLayerFactory {
  public static generateLayer(layer: Layer): OLLayer {
    let olLayer: OLLayer;
    if (layer.type === "bing") {
      olLayer = this.generateTileLayer(layer);
    }
    olLayer.setZIndex(layer.zIndex);
    return olLayer;
  }

  private static generateTileLayer(layer: Layer): OLLayer {
    let source: Source = OlSourceFactory.generateSource(layer);
    let olLayer: OLLayer = new TileLayer({source: <TileSource>source});
    this.setOLLayerProperties(olLayer, layer);
    return olLayer;
  }

  private static setOLLayerProperties(olLayer: OLLayer, layer: Layer) {
    olLayer.set('id', layer.id);
    olLayer.set('code', layer.code);
  }
}

