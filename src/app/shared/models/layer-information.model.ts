import { LayerInformationUrl } from "./layer-information-url.model";

export abstract class LayerInformation {
    public layerId: Number;
    public urls: LayerInformationUrl[];
} 