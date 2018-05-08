import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LayerManagerComponent} from './layer-manager.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../store/app.reducers';
import {HttpLoaderFactory} from '../app.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TimeBehaviorComponent} from './time-behavior/time-behavior.component';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';

describe('LayerManagerComponent', () => {
  let component: LayerManagerComponent;
  let fixture: ComponentFixture<LayerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayerManagerComponent, TimeBehaviorComponent],
      imports: [
        FormsModule,
        StoreModule.forRoot(reducers),
        HttpClientModule,
        CalendarModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
      ],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
