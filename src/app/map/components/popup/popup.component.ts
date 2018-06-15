/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Component, Input, OnInit, ViewChild} from '@angular/core';


import {Store} from '@ngrx/store';
import * as popupActions from '@app/map/store/actions/popup.actions';
import {PopupStatus} from '@app/map/store/actions/popup.actions';
import * as fromPopup from '@app/map/store/reducers/popup.reducers';
import {MapState} from '@app/map/store';
import {selectPopupState} from '@app/map/store/selectors/popup.selectors';

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
  @ViewChild('popupHandle') popupHandle;
  isOpen: boolean;

  constructor(private store: Store<MapState>) {
  }

  ngOnInit() {
    this.isOpen = false;
    this.store.select(selectPopupState).subscribe((popupState: fromPopup.PopupState) => {
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
