import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  host: {
    class: 'fill-area'
  }
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
