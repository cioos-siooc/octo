import {Layer} from '@app/shared/models';
import OLLayer from 'ol/layer/layer';

export abstract class BaseStyler {
    // The type identifier for the styler
    // This corresponds to the clientPresentation styler field in octopi
    static type: string;

    /**
     * Style vector layer
     *
     * @param {Layer} layer
     * @param {OLLayer} olLayer
     * @memberof Styler
     */
    public abstract setOLVectorLayerStyle(layer: Layer, olLayer: OLLayer): void;
}