import {AfterViewInit, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import View from 'ol/view'
import Map from 'ol/Map'
import Proj from 'ol/proj'
import OLLayer from 'ol/layer/layer'
import LayerBase from 'ol/layer/base'
import * as fromApp from '../../store/app.reducers';
import * as fromBaseLayer from '../store/base-layer.reducers';
import {OLLayerFactory} from "./ol-layer-factory.util";
import * as fromLayer from '../store/layer.reducers'
import {clone} from 'lodash';
import {isEqual} from 'lodash';
import {Layer} from "../../shared/layer.model";
@Component({
  selector: 'app-open-layers',
  templateUrl: './open-layers.component.html',
  styleUrls: ['./open-layers.component.css']
})
export class OpenLayersComponent implements AfterViewInit {
  map: Map;
  baseOLLayer: OLLayer = null;
  private layers: Layer[];

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.initBaseLayerSubscription();
    this.initLayerSubscription();
  }

  private initMap() {
    const mapview = new View({
      center: Proj.transform([-66.0, 51.0], 'EPSG:4326', 'EPSG:3857'),
      zoom: 5,
    });
    this.map = new Map({
      target: 'map',
      view: mapview,
    });
  }

  private initBaseLayerSubscription() {
    this.store.select('baseLayer')
    .filter(baseLayerState => baseLayerState.currentBaseLayer != null)
    .subscribe((baseLayerState: fromBaseLayer.State) => {
      if (this.getOLLayerFromId(baseLayerState.currentBaseLayer.id) == null) {
        if (this.baseOLLayer != null) {
          this.map.removeLayer(this.baseOLLayer);
        }
        const newLayer = OLLayerFactory.generateLayer(baseLayerState.currentBaseLayer);
        this.map.addLayer(newLayer);
        this.baseOLLayer = newLayer;
      }
    })
  }

  private getOLLayerFromId(id): LayerBase {
    return this.map.getLayers().getArray().filter((layer: LayerBase) => {
      return layer.get('id') === id
    })[0];
  }

  private initLayerSubscription() {
     this.store.select('layer')
    .subscribe((layerState : fromLayer.State) => {
      const currentOLLayers: Array<ol.layer.Base> = clone(this.map.getLayers().getArray());
      currentOLLayers.forEach((layer: OLLayer) => {
        // If the new layer is already there
         if (layerState.layers.some((l) => (l.uniqueId === layer.get('uniqueId')))) {
          const updatedOgslLayer = layerState.layers.filter((l) => {
            return l.uniqueId === layer.get('uniqueId')
          })[0];
          const oldOgslLayer = this.layers.filter((l) => {
            return l.uniqueId === layer.get('uniqueId')
          })[0];
          if (!isEqual(updatedOgslLayer, oldOgslLayer)) {
            //Only update the old layer if the new one is different
            const newOlLayer = OLLayerFactory.generateLayer(updatedOgslLayer);
            this.map.removeLayer(layer);
            this.map.addLayer(newOlLayer);
          }
        } else if (layer.get('uniqueId')!=null){
           //If old layer is not part of the new layers and isn't a background layer, remove it
          this.map.removeLayer(layer);
        }
      });
      //Add remaining layers
      layerState.layers.forEach((newLayer: Layer) => {
        if (!currentOLLayers.some((cL) => (cL.get('uniqueId') === newLayer.uniqueId))) {
          this.map.addLayer(OLLayerFactory.generateLayer(newLayer));
        }
      });
      this.layers = layerState.layers;
    })
  }
}
