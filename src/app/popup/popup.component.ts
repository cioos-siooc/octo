import {Component, Input, OnInit} from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/throttleTime';
import { throttle } from 'lodash';

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
  dragOverSubscription: any;
  mouseObservable: Observable<MouseEvent>;

  constructor() {
  }

  ngOnInit() {
    if (this.popupOpen == null) {
      this.popupOpen = true;
    }
    this.mouseObservable = Observable.fromEvent<MouseEvent>(document.body, 'dragover').throttleTime(10);
  }

  closePopup() {
    this.popupOpen = false;
  }

  onDragStart($event, popup) {
    $event.dataTransfer.setData('text/plain', 'dummy');
    this.lastMouseX = $event.clientX;
    this.lastMouseY = $event.clientY;
    this.dragOverSubscription = this.mouseObservable
      .subscribe(($ev) => {
        this.onDrag($ev, popup);
      });
  }

  onDragEnd($event, popup) {
    this.dragOverSubscription.unsubscribe();
  }

  onDrag($event, popup) {
    console.log('Drag');
    console.log($event);

    const deltaX = $event.clientX - this.lastMouseX;
    const deltaY = $event.clientY - this.lastMouseY;

    const container = popup.parentElement.parentElement;
    const newLeft = this.left + deltaX;
    const newTop = this.top + deltaY;

    console.log(deltaX, deltaY);
    if (
      (newLeft + popup.offsetWidth < container.offsetWidth) &&
      newLeft > 0
    ) {
      this.left = newLeft;
    }
    if (
      (newTop + popup.offsetHeight < container.offsetHeight) &&
      newTop > 0
    ) {
      this.top = newTop;
    }

    this.lastMouseX = $event.clientX;
    this.lastMouseY = $event.clientY;
  }
}
