import { DateRange } from '@app/shared/models/date-range.model';
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, HostListener } from "@angular/core";
import { select, scaleTime, axisBottom } from 'd3';

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


  constructor() { }

  ngOnInit() {
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
      // .tickFormat(timeFormat('%Y-%m-%d'));

    this.svg.append('g')
      .call(this.axis);
  }

  calculateNibPosition() {
    const parentRect = this.nib.nativeElement.parentElement.getBoundingClientRect();
    const nibPos = this.nib.nativeElement.style.left;

    console.log(nibPos);
    console.log(parentRect);
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
      } else if (diff > (parentWidth - (this.rightPad + (this.nibSize / 2))) {
        diff = parentWidth - (this.rightPad + (this.nibSize / 2));
      }
      this.nib.nativeElement.style.left = diff + 'px';
      this.calculateNibPosition();
    }
  }
}
