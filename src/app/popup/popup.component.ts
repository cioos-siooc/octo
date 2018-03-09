import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() title: string;
  @Input() popupOpen: boolean;
  @Input() top: number;
  @Input() left: number;
  lastMouseX: number;
  lastMouseY: number;

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

  onMouseDown($event) {
    this.lastMouseX = $event.clientX;
    this.lastMouseY = $event.clientY;
  }

  onDrag($event, popup) {
    const deltaX = $event.clientX - this.lastMouseX;
    const deltaY = $event.clientY - this.lastMouseY;

    const container = popup.parentElement.parentElement;
    const newLeft = this.left + deltaX;
    const newTop = this.top + deltaY;
    if (
      deltaX < 100 && deltaX > -100 &&
      (newLeft + popup.offsetWidth < container.offsetWidth) &&
      newLeft > 0
    ) {
      this.left = newLeft;
    }
    if (
      deltaY < 100 && deltaY > -100 &&
      (newTop + popup.offsetHeight < container.offsetHeight) &&
      newTop > 0
    ) {
      this.top = newTop;
    }

    this.lastMouseX = $event.clientX;
    this.lastMouseY = $event.clientY;
  }
}
