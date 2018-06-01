import {Component, Input, OnInit} from '@angular/core';


import {Store} from '@ngrx/store';
import * as popupActions from '../../store/actions/popup.actions';
import {PopupStatus} from '../../store/actions/popup.actions';
import * as fromPopup from '../../store/reducers/popup.reducers';
import {MapState} from '../../store/reducers/map.reducers';
import {selectPopupState} from '../../store/selectors/popup.selectors';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() title: string;
  @Input() id: string;
  @Input() bounds;
  @Input() inBounds: boolean;
  isOpen: boolean;

  constructor(private store: Store<MapState>) {
  }

  ngOnInit() {
    this.isOpen = false;
    this.store.select(selectPopupState).subscribe((popupState: fromPopup.State) => {
      const popupStatus = popupState.popupStatuses.find((pS: PopupStatus) => {
        return pS.id === this.id;
      });
      if (popupStatus != null) {
        this.isOpen = popupStatus.isOpen;
      }
    });
  }

  closePopup() {
    this.store.dispatch(new popupActions.TogglePopup(this.id));
  }

}