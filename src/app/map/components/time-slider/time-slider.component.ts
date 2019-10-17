/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { Store } from '@ngrx/store';
import { DateRange } from '@app/shared/models/date-range.model';
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, HostListener } from '@angular/core';
import { select, scaleTime, axisBottom } from 'd3';
import { MapState } from '@app/map/store';
import * as fromTimeActions from '@app/map/store/actions/time.actions';
import { debounce } from 'lodash';

@Component({
  selector: 'app-time-slider',
  templateUrl: './time-slider.component.html',
  styleUrls: ['./time-slider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimeSliderComponent implements OnInit {
  @ViewChild('nib') nib: ElementRef;

  containerSelector: string;
  dateRange: DateRange;
  svg: any;
  scale: any;
  axis: any;

  dragActive: boolean;
  start: number;

  leftPad: number;
  rightPad: number;
  nibSize: number;

  debouncedOnMouseMove: any;

  constructor(private store: Store<MapState>) { }

  ngOnInit() {
    /* debounce is used to put un timeout between two refreshes when the nib is getting moved by the user */
    /* Store the debounced function in a variable */
    this.debouncedOnMouseMove = debounce(this.mouseMoveHandler, 15);
    this.start = 0;
    this.containerSelector = '#slider';
    this.dateRange = {
      'start': new Date(2018, 1, 1),
      'end': new Date(2019, 1, 1)
    };
    this.dragActive = false;

    this.leftPad = 25;
    this.rightPad = 25;
    this.nibSize = this.nib.nativeElement.getBoundingClientRect().width;
    this.initTimeSlider(this.containerSelector, this.dateRange);
    this.nib.nativeElement.style.left = (this.leftPad - (this.nibSize / 2)).toString() + 'px';
  }

  resize() {
    select(this.containerSelector)
      .selectAll('svg')
      .remove();
    this.initTimeSlider(this.containerSelector, this.dateRange);
  }

  initTimeSlider(containerSelector: string, dateRange: DateRange) {
    const width = parseInt(select(containerSelector).style('width'), 10);
    const height = parseInt(select(containerSelector).style('height'), 10);

    this.svg = select(containerSelector).append('svg')
      .attr('width', width)
      .attr('height', height);

    this.scale = scaleTime()
      .domain([dateRange.start, dateRange.end])
      .range([this.leftPad, width - this.rightPad]);

    this.axis = axisBottom(this.scale)
      .tickSizeInner(14)
      .tickSizeOuter(18);

    this.svg.append('g')
      .call(this.axis);
  }

  calculateNibPosition(parentRect) {
    const parentXAdjusted = parentRect.x + this.leftPad;
    const nibRect = this.nib.nativeElement.getBoundingClientRect();
    const nibPos = ( nibRect.x - parentXAdjusted ) + ( this.nibSize / 2 );
    return nibPos;
  }

  activateNibDrag() {
    this.dragActive = true;
    this.start = this.nib.nativeElement.parentElement.getBoundingClientRect().x;
  }

  @HostListener( 'document:mouseup' )
  deactivateNibDrag(e) {
    if ( this.dragActive) {
      this.dragActive = false;
      this.onmousemove(e);
    }
  }

  @HostListener( 'document:mousemove', ['$event'] )
  onmousemove(e) {
    /* Calls the debounced function */
    this.debouncedOnMouseMove(e);
  }

  mouseMoveHandler(e) {
    if ( this.dragActive ) {
      let end = 0;
      if ( e.pageX ) {
        end = e.pageX;
      } else if ( e.clientX ) {
        end = e.clientX;
      }
      let diff = end - this.start;
      const parentWidth = this.nib.nativeElement.parentElement.getBoundingClientRect().width;
      if (diff < (0 + (this.leftPad - (this.nibSize / 2)))) {
        diff = 0 + (this.leftPad - (this.nibSize / 2));
      } else if (diff > (parentWidth - (this.rightPad + (this.nibSize / 2)))) {
        diff = parentWidth - (this.rightPad + (this.nibSize / 2));
      }
      this.nib.nativeElement.style.left = diff + 'px';
      this.calculateDateByNibPosition();
    }
  }

  calculateDateByNibPosition() {
    const parentRect = this.nib.nativeElement.parentElement.getBoundingClientRect();
    const positionNib = this.calculateNibPosition(parentRect);
    // Transforming dates in Unix Timestamp is better for manipulating dates
    const startUnixTimestamp = Math.round(this.dateRange['start'].getTime() / 1000);
    const endUnixTimestamp = Math.round(this.dateRange['end'].getTime() / 1000);
    // The ratio is needed to calculate the date according to where the nib is on the slider
    const nibRatio = positionNib / (parentRect.width - this.leftPad - this.rightPad);
    // Convert everything back to a date format after calculating the date with the ratio in Unix Timestamp
    const chosenDate = new Date((((endUnixTimestamp - startUnixTimestamp) * nibRatio) + startUnixTimestamp) * 1000);
    const chosenDateFormatted = {year: chosenDate.getFullYear(), month: chosenDate.getMonth() + 1, day: chosenDate.getDate(),
                                hour: chosenDate.getHours(), minute: chosenDate.getMinutes(), second: chosenDate.getSeconds()};
    this.updateDate(chosenDateFormatted);
  }

  updateDate(chosenDate) {
    this.store.dispatch(new fromTimeActions.UpdateTime(chosenDate));
  }
}
