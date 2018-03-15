import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/throttleTime';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() title: string;
  @Input() popupOpen: boolean;

  constructor() {
  }

  ngOnInit() {
    if (this.popupOpen == null) {
      this.popupOpen = true;
    }
  }

  closePopup() {
    this.popupOpen = false;
  }

}
