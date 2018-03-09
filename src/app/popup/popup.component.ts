import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

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

  onDrag($event) {
    const deltaX = $event.clientX - this.lastMouseX;
    const deltaY = $event.clientY - this.lastMouseY;
    console.log(deltaY);

    if (deltaX < 100 && deltaX > -100) { this.left += deltaX; }
    if (deltaY < 100 && deltaY > -100) { this.top += deltaY; }

    this.lastMouseX = $event.clientX;
    this.lastMouseY = $event.clientY;
  }
}
