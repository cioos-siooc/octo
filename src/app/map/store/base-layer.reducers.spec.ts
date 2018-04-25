import * as baseLayerActions from './base-layer.actions';
import {baseLayerReducer} from './base-layer.reducers';
import {Layer} from '../../shared/layer.model';
import {BingLayer} from '../../shared/bing-layer.model';

describe('BaseLayerReducer', () => {

  it('should return default state when no state and no action passed', () => {
    const defaultState = {
      currentBaseLayer: null,
      baseLayers: []
    };
    expect(baseLayerReducer(undefined, <any>{})).toEqual(defaultState);
  });

  it('should have immutable payload', () => {
    const initialState = {
      currentBaseLayer: null,
      baseLayers: []
    };
    const layer = new BingLayer();
    layer.id = 1;
    const action = new baseLayerActions.SetCurrentBaseLayer(layer);
    const finalState = baseLayerReducer(initialState, action);
    layer.code = 'test-code';
    expect(finalState.currentBaseLayer).not.toEqual(layer);
  });

  it('should add layer to state.baseLayers', () => {
    const initialState = {
      currentBaseLayer: null,
      baseLayers: []
    };
    const layer = new BingLayer();
    layer.id = 1;
    const action = new baseLayerActions.AddBaseLayer(layer);
    const finalState = baseLayerReducer(initialState, action);
    const expectedState = {
      currentBaseLayer: null,
      baseLayers: [layer]
    };
    expect(finalState).toEqual(expectedState);
  });

  it('should set currentBaseLayer in state', () => {
    const initialState = {
      currentBaseLayer: null,
      baseLayers: []
    };
    const layer = new BingLayer();
    layer.id = 1;
    const action = new baseLayerActions.SetCurrentBaseLayer(layer);
    const finalState = baseLayerReducer(initialState, action);
    const expectedState = {
      currentBaseLayer: <Layer>layer,
      baseLayers: []
    };
    expect(finalState).toEqual(expectedState);
  });
});
