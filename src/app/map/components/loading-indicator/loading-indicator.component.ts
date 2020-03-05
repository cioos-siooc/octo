import { LoadingService } from './../../services/loading.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingIndicatorComponent implements OnInit, OnDestroy {
  show: boolean;
  private subscription: Subscription;

  constructor(private service: LoadingService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.show = false; 
    this.subscription = this.service.getStatus().subscribe((state) => {
      this.show = state;
      this.ref.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
