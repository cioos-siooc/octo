import {layerReducer} from './layer.reducers';
import * as fromLayer from './layer.reducers';
import {WmsLayer} from '../../shared/wms-layer.model';
import {AddLayer, DeleteLayer, MoveDownLayer, MoveUpLayer, SetClientPresentation, UpdateLayer} from './layer.actions';
import {ClientPresentation} from '../../shared/client-presentation.model';

describe('LayerReducer', () => {

  it('should return default state when no state and no action passed', () => {
    const defaultState = {
      layers: [],
    };
    expect(layerReducer(undefined, <any>{})).toEqual(defaultState);
  });

  it('should have immutable payload', () => {
    const layer = new WmsLayer();
    layer.id = 1;
    const action = new AddLayer(layer);
    const finalState = layerReducer(fromLayer.initialState, action);
    layer.code = 'test-code';
    expect(finalState.layers[0]).not.toEqual(layer);
  });


  it('should add layer to state.layers', () => {
    const layer = new WmsLayer();
    layer.id = 1;
    const action = new AddLayer(layer);
    const finalState = layerReducer(fromLayer.initialState, action);
    const expectedState = {
      layers: [layer]
    };
    expect(finalState).toEqual(expectedState);
  });

  it('should delete layer from state.layers', () => {
    const layer = new WmsLayer();
    layer.id = 1;
    layer.uniqueId = '1';
    const initialState = {
      layers: [layer]
    };
    const action = new DeleteLayer('1');
    const finalState = layerReducer(initialState, action);
    const expectedState = {
      layers: []
    };
    expect(finalState).toEqual(expectedState);
  });

  it('should update layer to given layer', () => {
    const layer = new WmsLayer();
    layer.id = 1;
    layer.uniqueId = '1';
    layer.code = 'initial-code';
    const initialState = {
      layers: [layer]
    };
    const updatedLayer = new WmsLayer();
    updatedLayer.id = 1;
    updatedLayer.uniqueId = '1';
    updatedLayer.code = 'final-code';
    const action = new UpdateLayer(updatedLayer);
    const finalState = layerReducer(initialState, action);
    expect(finalState.layers[0].code).toEqual('final-code');
  });

  it('should move layer up', () => {
    const firstLayer = new WmsLayer();
    firstLayer.uniqueId = '1';
    const secondLayer = new WmsLayer();
    secondLayer.uniqueId = '2';
    const initialState = {
      layers: [firstLayer, secondLayer]
    };
    const action = new MoveUpLayer('1');
    const finalState = layerReducer(initialState, action);
    expect(finalState.layers[0].uniqueId).toEqual('2');
  });

  it('should move layer down', () => {
    const firstLayer = new WmsLayer();
    firstLayer.uniqueId = '1';
    const secondLayer = new WmsLayer();
    secondLayer.uniqueId = '2';
    const initialState = {
      layers: [firstLayer, secondLayer]
    };
    const action = new MoveDownLayer('2');
    const finalState = layerReducer(initialState, action);
    expect(finalState.layers[0].uniqueId).toEqual('2');
  });

  it('should set current client presentation for specified layer', () => {
    const layer = new WmsLayer();
    layer.uniqueId = '1';
    const clientPresentation = new ClientPresentation();
    clientPresentation.id = 1;
    clientPresentation.isDefault = true;
    const initialState = {
      layers: [layer]
    };
    const action = new SetClientPresentation({
      uniqueId: layer.uniqueId,
      clientPresentation: clientPresentation
    });
    const finalState = layerReducer(initialState, action);
    expect(finalState.layers[0].currentClientPresentation).toEqual(clientPresentation);
  });

});
