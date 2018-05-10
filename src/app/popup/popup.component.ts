import {Component, Input, OnInit} from '@angular/core';


import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as popupActions from '../map/store/popup.actions';
import {PopupStatus} from '../map/store/popup.actions';
import * as fromPopup from '../map/store/popup.reducers';

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

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.isOpen = false;
    this.store.select('popup').subscribe((popupState: fromPopup.State) => {
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
