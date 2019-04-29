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
