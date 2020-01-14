export function hasLayerId(layerList: any[], layerId: number) {
    const index = layerList.findIndex((l: any) => l.id === layerId);
    return index >= 0;
}