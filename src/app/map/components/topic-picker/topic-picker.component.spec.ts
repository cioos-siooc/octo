import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TopicPickerComponent} from './topic-picker.component';
import {StoreModule} from '@ngrx/store';
import {HttpLoaderFactory} from '@app/shared/shared.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {mapReducers} from '@app/map/store';

describe('TopicPickerComponent', () => {
  let component: TopicPickerComponent;
  let fixture: ComponentFixture<TopicPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopicPickerComponent],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
      ]
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
