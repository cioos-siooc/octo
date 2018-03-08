import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TopicPickerComponent} from './topic-picker.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from "../store/app.reducers";

describe('TopicPickerComponent', () => {
  let component: TopicPickerComponent;
  let fixture: ComponentFixture<TopicPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopicPickerComponent],
      imports:
        [StoreModule.forRoot(reducers)]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
