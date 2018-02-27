import {AfterViewInit, Component} from '@angular/core';
import Map from 'ol/map';
import BingSource from 'ol/source/bingMaps'
import TileLayer from 'ol/layer/tile'
import Proj from 'ol/proj'
import View from 'ol/view'

@Component({
  selector: 'app-open-layers',
  templateUrl: './open-layers.component.html',
  styleUrls: ['./open-layers.component.css']
})
export class OpenLayersComponent implements AfterViewInit {
  map:any;
  constructor() {
  }

  ngAfterViewInit(): void {
    const mapview = new View({
      center: Proj.transform([-66.0, 51.0], 'EPSG:4326', 'EPSG:3857'),
      zoom: 5,
    });
    const backlayer = new TileLayer({
      visible: true,
      preload: Infinity,
      source: new BingSource({
        key: 'Al-vCFd3kpTVli45kJ62doCSRNQY1DoYdw0s-vP1vwgiWiO3TiOQsu2EGlYAy9xt',
        imagerySet: 'Aerial',
        // use maxZoom 19 to see stretched tiles instead of the BingMaps
        // "no photos at this zoom level" tiles
        maxZoom: 19,
      }),
    });
    this.map = new Map({
      target: 'map',
      view: mapview,
      layers: [backlayer],
    });
  }

}
