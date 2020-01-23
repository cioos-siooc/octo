/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {AfterViewInit, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router, ActivatedRoute} from '@angular/router';
import {forkJoin} from 'rxjs';
import View from 'ol/view';
import Feature from 'ol/feature';
import OLMap from 'ol/map';
import Proj from 'ol/proj';
import OLLayer from 'ol/layer/layer';
import LayerBase from 'ol/layer/base';
import TileWMS from 'ol/source/tilewms';
import * as fromBaseLayer from '@app/map/store/reducers/base-layer.reducers';
import {OLLayerFactory} from '@app/map/utils';
import * as fromLayer from '@app/map/store/reducers/layer.reducers';
import {clone, cloneDeep, isEqual} from 'lodash';
import {Layer} from '@app/shared/models';
import {WmsStrategy} from '@app/shared/models';
import {HttpClient} from '@angular/common/http';
import * as mapClickActions from '@app/map/store/actions/map-click.actions';
import {EmptyValidatorFactory} from '@app/shared/utils';
import {MapClickInfo} from '@app/shared/models';
import {filter} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {ClickFormatterFactory} from '@app/map/utils';
import {MapState} from '@app/map/store';
import {selectBaseLayerState} from '@app/map/store/selectors/base-layer.selectors';
import {selectLayerState} from '@app/map/store/selectors/layer.selectors';
import { take } from 'rxjs/operators';
import { MapService } from '../../utils/open-layers/map.service';

@Component({
  selector: 'app-open-layers',
  templateUrl: './open-layers.component.html',
  styleUrls: ['./open-layers.component.css']
})
export class OpenLayersComponent implements AfterViewInit {
  map: OLMap;
  baseOLLayer: OLLayer = null;
  private layers: Layer[];

  constructor(private httpClient: HttpClient, private store: Store<MapState>,
              private router: Router, private olLayerFactory: OLLayerFactory,
              private route: ActivatedRoute, private mapService: MapService) {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.initBaseLayerSubscription();
    this.initLayerSubscription();
    this.initMapClick();
  }

  private initMap() {
    // Initialize the map

    // Setup the position
    let mapview = null;
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      if ('mapextent' in params) {
        // If position is stored in the url use that
        const mapextent = params.mapextent.split(',').map(x => +x);
        mapview = new View({
          center: mapextent.slice(0, 2),
          zoom: mapextent[2]
        });
      } else {
        // Go to a default position if it is not stored in the url
        mapview = new View({
          center: Proj.transform([-66.0, 51.0], 'EPSG:4326', 'EPSG:3857'),
          zoom: 5,
        });
      }
    });
    this.map = new OLMap({
      target: 'map',
      view: mapview,
    });

    this.mapService.setMap(this.map);

    // Register event listeners to update the URL with map location
    this.map.on('moveend', () => {
      // Add the location to the url any time the user moves thes map
      const mapExtent = this.map.getView().getCenter().concat(this.map.getView().getZoom());
      this.router.navigate([], {
        queryParams: {'mapextent': mapExtent.toString()},
        queryParamsHandling: 'merge',
      });
    });
  }

  private initBaseLayerSubscription() {
    this.store.select(selectBaseLayerState)
      .pipe(filter(baseLayerState => baseLayerState.currentBaseLayer != null)
      ).subscribe((baseLayerState: fromBaseLayer.BaseLayerState) => {
      const clonedBaseLayerState = cloneDeep(baseLayerState);
      if (this.getOLLayerFromId(clonedBaseLayerState.currentBaseLayer.id) == null) {
        if (this.baseOLLayer != null) {
          this.map.removeLayer(this.baseOLLayer);
        }
        const newLayer = this.olLayerFactory.generateLayer(clonedBaseLayerState.currentBaseLayer);
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
    this.store.select(selectLayerState)
      .subscribe((layerState: fromLayer.LayerState) => {
        const layerList = layerState.layers.filter(layer => layer.type !== 'layerGroup');
        const currentOLLayers: Array<ol.layer.Base> = clone(this.map.getLayers().getArray());
        // Remove and then recreate existing layers(to handle updates)
        currentOLLayers.forEach((layer: OLLayer) => {
          const updatedOgslLayer = layerList.find((l) => {
            return l.uniqueId === layer.get('uniqueId');
          });
          if (updatedOgslLayer != null) {
            const oldOgslLayer = this.layers.find((l) => {
              return l.uniqueId === layer.get('uniqueId');
            });
            if (!isEqual(updatedOgslLayer, oldOgslLayer)) {
              // Only update the old layer if the new one is different
              const newOlLayer = this.olLayerFactory.generateLayer(updatedOgslLayer);
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
        // Add remaining layers(these ones should be new layers)
        layerList.forEach((newLayer: Layer) => {
          if (!currentOLLayers.some((cL) => (cL.get('uniqueId') === newLayer.uniqueId))) {
            this.map.addLayer(this.olLayerFactory.generateLayer(newLayer));
          }
        });
        this.layers = layerList;
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
      return bLayerIndex - aLayerIndex;
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

      // Request click information from the server
      this.retrieveFeatureInfos(evt, resultObservables, layerUniqueIdToObsIndex);
      this.retrieveWmsInfos(evt, resultObservables, layerUniqueIdToObsIndex);

      // Format the click information for display in the sidebar
      this.setClickInformation(resultObservables, layerUniqueIdToObsIndex);
    });
  }

  /**
   * Sets up a getFeatureInfo URL using openlayers, then fetches click information from the server
   * The click information is added to resultObservables to be added to the mapClick reducer in the proper format
   *
   * The format requested from the server is dictated by clickStrategy.format as configured for the layer in OctoPi
   * This is a freetext field, anything supported by the server can be used
   *
   * @private
   * @param {ol.MapBrowserEvent} evt The openlayers click event which gives the user's mouse position
   *                                 used to identify which feature was clicked
   * @param {any[]} resultObservables The observable which is used to communicate the click information received asyncronously
   *                                  from httpclient
   * @param {Map<string, number>} layerUniqueIdToObsIndex The mapping between click information for a specific feature
   *                                                      and the identifier for the layer the information came from
   * @memberof OpenLayersComponent
   */
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

          let length = null;
          if ((<WmsStrategy>l.clickStrategy).format.includes('json')) {
            length = resultObservables.push(this.httpClient.get(getFeatureUrl,
              {responseType: 'json'}));
          } else {
            length = resultObservables.push(this.httpClient.get(getFeatureUrl,
              {responseType: 'text'}));
          }
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
          const length = resultObservables.push(of({
            ...feature.getProperties(),
            featureId: feature.getId()
          }));
          layerUniqueIdToObsIndex.set(layer.uniqueId, length - 1);
          return feature;
        }
      });
  }

  /**
   *
   *
   * @private
   * @param {any[]} resultObservables
   * @param {Map<string, number>} layerUniqueIdToObsIndex
   * @memberof OpenLayersComponent
   */
  private setClickInformation(resultObservables: any[], layerUniqueIdToObsIndex: Map<string, number>) {
    // Subscribe to the resultObservables
    // This contains http responses from httpclient which are asynchronous
    // so an observable becomes necessary
    forkJoin(resultObservables).subscribe((result) => {
      for (let i = this.layers.length - 1; i >= 0; i--) {
        const currentLayer = this.layers[i];
        if (currentLayer.clickStrategy != null) {
          let mapClickInfo;
          // Use the layerUniqueIdToObsIndex to fetch the observation/feature identifier
          // Based on the mapping observation/feature identifier fetch the relevant http response from the resultObservables
          const currentResult = result[layerUniqueIdToObsIndex.get(currentLayer.uniqueId)];

          // Get the emptyValidator
          // This is used to validate whether the clickInformation response from the server is valid or not
          const emptyValidator = EmptyValidatorFactory.getEmptyValidator((currentLayer.clickStrategy.emptyValidatorCode));
          // Check if the result is valid
          if ((emptyValidator == null || !emptyValidator.isPayloadEmpty(currentResult)) && currentResult != null) {
            // If a clickFormatterInfo entry is defined in octoPi, use it to format the result
            // This is used for formatting JSON responses
            if (currentLayer.clickFormatterInfo != null) {
              const type = currentLayer.clickFormatterInfo.type;
              const formatterDef = currentLayer.clickFormatterInfo.formatterDef;
              // Request the correct click formatter from the ClickFormatterFactory based on formatter type
              // formatterDef is passaed to the click formatter, this defines how the JSON will be formatted
              const clickFormatter = ClickFormatterFactory.getClickFormatter(type, formatterDef);

              // Use the clickFormatter to format the result, returns a MapClickInfo object to be inserted into
              // the MapClickReducer
              mapClickInfo = clickFormatter.getMapClickInfo(currentResult);
            } else {
              // If there is no clickFormatterInfo defined it is assumed that the result is HTML
              // Initialize an empty MapClickInfo
              mapClickInfo = new MapClickInfo();
              // Insert the html received from the server into the MapClickInfo object
              mapClickInfo.html = currentResult;
            }

            mapClickInfo.layerId = currentLayer.id;
            // Dispatch an action to add the newly created MapClickInfo to the MapClickReducer
            this.store.dispatch(new mapClickActions.SetMapClickInfo(mapClickInfo));
            break;
          }
        }
      }
    });
  }
}
