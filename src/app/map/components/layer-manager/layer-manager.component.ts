import { SetLayerPosition } from './../../store/actions/layer.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MapState } from '@app/map/store';
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
            layerState => this.layers = layerState.layers.slice().reverse()
        );
    }

    dropItem(newIndex, e, layersCount: number) {
        const inversedNewIndex = layersCount - newIndex;
        this.store.dispatch(new SetLayerPosition({
            layerId: JSON.stringify(e.dragData['id']),
            newLayerPosition: inversedNewIndex}));
    }
}
