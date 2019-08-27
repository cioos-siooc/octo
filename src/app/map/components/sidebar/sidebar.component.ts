/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
  }

  sidebarCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.sendStatus();
  }

  sendStatus() {
    this.sidebarService.setSidebarStatus(this.isCollapsed);
  }

}
