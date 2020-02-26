import { StoreModule } from '@ngrx/store';
import { mapReducers } from '@app/map/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSliderComponent } from './time-slider.component';

describe('TimeSliderComponent', () => {
  let component: TimeSliderComponent;
  let fixture: ComponentFixture<TimeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSliderComponent ],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
