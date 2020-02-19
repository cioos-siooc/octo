import { LoadingService } from './../../services/loading.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent implements OnInit {
  show: Boolean = false;
  private subscription: Subscription;

  constructor(private service: LoadingService) { }

  ngOnInit() {
    this.subscription = this.service.loadingState.subscribe((state) => {
      // Changing the state type from "unknown" to boolean
      this.show = state instanceof Boolean;
    });
  }

  OnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
