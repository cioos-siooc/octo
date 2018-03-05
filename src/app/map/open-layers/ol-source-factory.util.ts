import {Layer} from "../../shared/layer.model";
import {BingLayer} from "../../shared/bing-layer.model";
import Source from 'ol/source/source'
import BingMapsSource from 'ol/source/bingmaps'

export class OlSourceFactory {

  public static generateSource(layer: Layer) {
    let source: Source;
    if (layer.type === "bing") {
      source = this.generateBingMapsSource(<BingLayer>layer);
    }
    return source;
  }

  private static generateBingMapsSource(layer: BingLayer): Source {
    return new BingMapsSource({
      key: layer.key,
      imagerySet: layer.imagerySet
    })
  }
}
