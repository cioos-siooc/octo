import {AfterViewInit, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {forkJoin, Observable} from 'rxjs';
import View from 'ol/view';
import Feature from 'ol/feature';
import OLMap from 'ol/map';
import Proj from 'ol/proj';
import OLLayer from 'ol/layer/layer';
import LayerBase from 'ol/layer/base';
import TileWMS from 'ol/source/tilewms';
import * as fromApp from '../../store/app.reducers';
import * as fromBaseLayer from '../store/base-layer.reducers';
import {OLLayerFactory} from './ol-layer-factory.util';
import * as fromLayer from '../store/layer.reducers';
import {clone, cloneDeep, isEqual} from 'lodash';
import {Layer} from '../../shared/layer.model';
import {WmsStrategy} from '../../shared/wms-strategy.model';
import {HttpClient} from '@angular/common/http';
import {MAP_CLICK_POPUP_ID} from '../map.component';
import * as popupActions from '../store/popup.actions';
import * as mapClickActions from '../../map-click/store/map-click.actions';
import {EmptyValidatorFactory} from '../../shared/empty-validator-factory.util';
import {ClickFormatterFactory} from '../../shared/click-formatter/click-formatter-factory.util';
import {MapClickInfo} from '../../shared/map-click-info.model';
import {filter} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-open-layers',
  templateUrl: './open-layers.component.html',
  styleUrls: ['./open-layers.component.css']
})
export class OpenLayersComponent implements AfterViewInit {
  map: OLMap;
  baseOLLayer: OLLayer = null;
  private layers: Layer[];

  constructor(private httpClient: HttpClient, private store: Store<fromApp.AppState>) {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.initBaseLayerSubscription();
    this.initLayerSubscription();
    this.initMapClick();
  }

  private initMap() {
    const mapview = new View({
      center: Proj.transform([-66.0, 51.0], 'EPSG:4326', 'EPSG:3857'),
      zoom: 5,
    });
    this.map = new OLMap({
      target: 'map',
      view: mapview,
    });
  }

  private initBaseLayerSubscription() {
    this.store.select('baseLayer')
      .pipe(filter(baseLayerState => baseLayerState.currentBaseLayer != null)
      ).subscribe((baseLayerState: fromBaseLayer.State) => {
        const clonedBaseLayerState = cloneDeep(baseLayerState);
      if (this.getOLLayerFromId(clonedBaseLayerState.currentBaseLayer.id) == null) {
        if (this.baseOLLayer != null) {
          this.map.removeLayer(this.baseOLLayer);
        }
        const newLayer = OLLayerFactory.generateLayer(clonedBaseLayerState.currentBaseLayer);
        this.map.addLayer(newLayer);
        this.baseOLLayer = newLayer;
      }
    });
  }

  private getOLLayerFromId(id): LayerBase {
    return this.map.getLayers().getArray().find((layer: LayerBase) => {
      return layer.get('id') === id;
    });
  }

  private initLayerSubscription() {
    this.store.select('layer')
      .subscribe((layerState: fromLayer.State) => {
        const clonedLayerState = cloneDeep(layerState);
        const currentOLLayers: Array<ol.layer.Base> = clone(this.map.getLayers().getArray());
        currentOLLayers.forEach((layer: OLLayer) => {
          const updatedOgslLayer = clonedLayerState.layers.find((l) => {
            return l.uniqueId === layer.get('uniqueId');
          });
          if (updatedOgslLayer != null) {
            const oldOgslLayer = this.layers.find((l) => {
              return l.uniqueId === layer.get('uniqueId');
            });
            if (!isEqual(updatedOgslLayer, oldOgslLayer)) {
              // Only update the old layer if the new one is different
              const newOlLayer = OLLayerFactory.generateLayer(updatedOgslLayer);
              const index = this.map.getLayers().getArray().findIndex((l) => {
                return l.get('uniqueId') === layer.get('uniqueId');
              });
              this.map.getLayers().removeAt(index);
              this.map.getLayers().insertAt(index, newOlLayer);
            }
          } else if (!this.isBackgroundLayer(layer)) {
            // If old layer is not part of the new layers and isn't a background layer, remove it
            this.map.removeLayer(layer);
          }
        });
        // Add remaining layers
        clonedLayerState.layers.forEach((newLayer: Layer) => {
          if (!currentOLLayers.some((cL) => (cL.get('uniqueId') === newLayer.uniqueId))) {
            this.map.addLayer(OLLayerFactory.generateLayer(newLayer));
          }
        });
        this.layers = clonedLayerState.layers;
        this.checkLayerPriority();
      });
  }

  private checkLayerPriority() {
    this.map.getLayers().getArray().sort((a, b) => {
      // Consider background layers to be equal to other layers
      if (this.isBackgroundLayer(a) || this.isBackgroundLayer(b)) {
        return 0;
      }
      const aLayerIndex = this.layers.findIndex((l) => {
        return l.uniqueId === a.get('uniqueId');
      });
      const bLayerIndex = this.layers.findIndex((l) => {
        return l.uniqueId === b.get('uniqueId');
      });
      return aLayerIndex - bLayerIndex;
    });
    this.map.render();
  }

  private isBackgroundLayer(layer) {
    // Background layers do not have a uniqueId, since they cannot be duplicated
    return layer.get('uniqueId') == null;
  }

// TODO: To refactor into proper setup with appropriate classes and not hardcoded
  private initMapClick() {
    this.map.on('singleclick', (evt: ol.MapBrowserEvent) => {
      const resultObservables = [];
      const layerUniqueIdToObsIndex = new Map<string, number>();

      this.retrieveFeatureInfos(evt, resultObservables, layerUniqueIdToObsIndex);
      this.retrieveWmsInfos(evt, resultObservables, layerUniqueIdToObsIndex);
      this.setClickInformation(resultObservables, layerUniqueIdToObsIndex);
    });
  }

  private retrieveWmsInfos(evt: ol.MapBrowserEvent, resultObservables: any[], layerUniqueIdToObsIndex: Map<string, number>) {
    const view: View = this.map.getView();
    this.layers.forEach((l) => {
      if (l.clickStrategy != null) {
        if (l.clickStrategy.type === 'wms') {
          const olLayer: OLLayer = <OLLayer> this.map.getLayers().getArray().find((olL) => {
            return olL.get('uniqueId') === l.uniqueId;
          });
          const source: TileWMS = <TileWMS> olLayer.getSource();
          const getFeatureUrl = source.getGetFeatureInfoUrl(evt.coordinate, view.getResolution(), view.getProjection(), <any>{
            INFO_FORMAT: (<WmsStrategy>l.clickStrategy).format,
            FEATURE_COUNT: (<WmsStrategy>l.clickStrategy).featureCount
          });
          const length = resultObservables.push(this.httpClient.get(getFeatureUrl,
            {responseType: 'text'}));
          layerUniqueIdToObsIndex.set(l.uniqueId, length - 1);
        }
      }
    });
  }

  private retrieveFeatureInfos(evt: ol.MapBrowserEvent, resultObservables: any[], layerUniqueIdToObsIndex: Map<string, number>) {
    this.map.forEachFeatureAtPixel(evt.pixel,
      (feature: Feature, olLayer) => {
        const layer = this.layers.filter((l: Layer) => l.uniqueId === olLayer.get('uniqueId'))[0];
        if (layer.clickStrategy != null && layer.clickStrategy.type === 'json-included') {
          const length = resultObservables.push(of(feature.getProperties()));
          layerUniqueIdToObsIndex.set(layer.uniqueId, length - 1);
          return feature;
        }
      });
  }

  // TODO: Possibility to set layer here and return result payload for it to be formatted?
  // TODO: Formatter method/class would check mapclicklayer.ClickLayer and format the result according to that layer formatter?
  // TODO: subscribe + filter layer not null?
  private setClickInformation(resultObservables: any[], layerUniqueIdToObsIndex: Map<string, number>) {
    forkJoin(resultObservables).subscribe((result) => {
      for (let i = this.layers.length - 1; i >= 0; i--) {
        const currentLayer = this.layers[i];
        if (currentLayer.clickStrategy != null) {
          let mapClickInfo;
          const currentResult = result[layerUniqueIdToObsIndex.get(currentLayer.uniqueId)];
          const emptyValidator = EmptyValidatorFactory.getEmptyValidator((currentLayer.clickStrategy.emptyValidatorCode));
          if ((emptyValidator == null || !emptyValidator.isPayloadEmpty(currentResult)) && currentResult != null) {
            if (currentLayer.clickFormatterInfo != null) {
              const type = currentLayer.clickFormatterInfo.type;
              const formatterDef = currentLayer.clickFormatterInfo.formatterDef;
              const clickFormatter = ClickFormatterFactory.getClickFormatter(type, formatterDef);
              mapClickInfo = clickFormatter.getMapClickInfo(currentResult);

            } else {
              mapClickInfo = new MapClickInfo();
              mapClickInfo.html = currentResult;
            }
            this.store.dispatch(new mapClickActions.SetMapClickInfo(mapClickInfo));
            this.store.dispatch(new mapClickActions.SetMapClickLayer(currentLayer));
            this.store.dispatch(new popupActions.SetIsOpen({popupId: MAP_CLICK_POPUP_ID, isOpen: true}));
            break;
          }
        }
      }
    });
  }
}
