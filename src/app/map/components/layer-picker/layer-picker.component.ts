import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-layer-picker',
  templateUrl: './layer-picker.component.html',
  styleUrls: ['./layer-picker.component.css']
})
export class LayerPickerComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content);
  }

}
