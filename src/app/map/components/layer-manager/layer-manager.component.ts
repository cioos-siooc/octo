import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { MapState } from '@app/map/store';
import { DeleteLayer } from '@app/map/store/actions/layer.actions';
import { selectLayerState } from '@app/map/store/selectors/layer.selectors';
import { Layer } from '@app/shared/models';

@Component({
    selector: 'app-layer-manager',
    templateUrl: './layer-manager.component.html',
    styleUrls: ['./layer-manager.component.css']
})
export class LayerManagerComponent implements OnInit {
    layers: Layer[];

    constructor(private store: Store<MapState>) {
    }

    ngOnInit() {
        this.store.select(selectLayerState).subscribe(
            layerState => this.layers = layerState.layers
        );
    }

    removeLayer(layerId: number) {
        this.store.dispatch(new DeleteLayer(layerId.toString()));
    }
}
