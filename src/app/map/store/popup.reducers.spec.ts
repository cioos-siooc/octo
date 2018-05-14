import * as fromPopup from './popup.reducers';
import {popupReducer} from './popup.reducers';
import * as popupActions from './popup.actions';

describe('PopupReducer', () => {

  it('should return default state when no state and no action passed', () => {
    expect(popupReducer(undefined, <any>{})).toEqual(fromPopup.initialState);
  });


  it('should have immutable payload', () => {
    const popupStatus = {
      id: '2',
      isOpen: true
    };
    const action = new popupActions.AddPopup(popupStatus);
    const finalState = popupReducer(fromPopup.initialState, action);
    popupStatus.id = '3';
    expect(finalState.popupStatuses[0]).not.toEqual(popupStatus);
  });

  it('should add popupStatus to state.PopupStatuses', () => {
    const popupStatus = {
      id: '2',
      isOpen: true
    };
    const action = new popupActions.AddPopup(popupStatus);
    const finalState = popupReducer(fromPopup.initialState, action);
    const expectedState = {
      popupStatuses: [popupStatus]
    };
    expect(finalState).toEqual(expectedState);
  });

  it('should delete popupStatus from state.PopupStatuses', () => {
    const popupStatus = {
      id: '2',
      isOpen: true
    };
    const initialState = {
      popupStatuses: [popupStatus]
    };
    const action = new popupActions.DeletePopup('2');
    const finalState = popupReducer(initialState, action);
    const expectedState = {
      popupStatuses: []
    };
    expect(finalState).toEqual(expectedState);
  });

  it('should toggle popup isOpen status', () => {
    const popupStatus = {
      id: '2',
      isOpen: false
    };
    const initialState = {
      popupStatuses: [popupStatus]
    };
    const action = new popupActions.TogglePopup('2');
    const finalState = popupReducer(initialState, action);
    const finalPopupStatus = {
      id: '2',
      isOpen: true
    };
    const expectedState = {
      popupStatuses: [finalPopupStatus]
    };
    expect(finalState).toEqual(expectedState);
  });

  it('should set popup isOpen according to payload', () => {
    const popupStatus = {
      id: '2',
      isOpen: false
    };
    const initialState = {
      popupStatuses: [popupStatus]
    };
    const action = new popupActions.SetIsOpen({popupId: '2', isOpen: true});
    const finalState = popupReducer(initialState, action);
    const finalPopupStatus = {
      id: '2',
      isOpen: true
    };
    const expectedState = {
      popupStatuses: [finalPopupStatus]
    };
    expect(finalState).toEqual(expectedState);
  });
});
