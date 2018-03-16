import {Component, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
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
  @Input() bounds;
  @Input() inBounds: boolean;
  @Output() popupOpenChange = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
    if (this.popupOpen == null) {
      this.popupOpen = true;
    }
  }

  closePopup() {
    this.popupOpen = false;
    this.popupOpenChange.emit(this.popupOpen);
  }

}
