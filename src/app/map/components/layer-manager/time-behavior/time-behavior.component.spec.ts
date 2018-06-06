import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {TimeBehaviorComponent} from './time-behavior.component';
import {StoreModule} from '@ngrx/store';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpLoaderFactory} from '../../../../shared/shared.module';
import {CalendarModule} from 'primeng/calendar';
import {mapReducers} from '@app/map/store';

describe('TimeBehaviorComponent', () => {
  let component: TimeBehaviorComponent;
  let fixture: ComponentFixture<TimeBehaviorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeBehaviorComponent],
      imports: [
        FormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
        HttpClientModule,
        CalendarModule,
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
    fixture = TestBed.createComponent(TimeBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
