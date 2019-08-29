import { DateRange } from '@app/shared/models/date-range.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, ScaleTime, scaleTime, axisBottom, timeFormat } from 'd3';
import { container } from '@angular/core/src/render3';

@Component({
  selector: 'app-time-slider',
  templateUrl: './time-slider.component.html',
  styleUrls: ['./time-slider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimeSliderComponent implements OnInit {
  containerSelector: string;
  nibSelector: string;
  dateRange: DateRange;
  svg: any;
  scale: any;
  axis: any;

  constructor() { }

  ngOnInit() {
    this.containerSelector = '#slider';
    this.dateRange = {
      'start': new Date(2018, 1, 1),
      'end': new Date(2019, 1, 1)
    };
    this.initTimeSlider(this.containerSelector, this.dateRange);
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
      .range([15, width - 15]);

    this.axis = axisBottom(this.scale);
      // .tickFormat(timeFormat('%Y-%m-%d'));

    this.svg.append('g')
      .call(this.axis);
  }

}
