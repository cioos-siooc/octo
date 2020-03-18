import { BehaviorHandlerFactory, MapService } from '@app/map/utils';
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {TimeBehaviorComponent} from './time-behavior.component';
import {StoreModule} from '@ngrx/store';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpLoaderFactory} from '@app/shared/shared.module';
import {CalendarModule} from 'primeng/calendar';
import {mapReducers} from '@app/map/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('TimeBehaviorComponent', () => {
  let component: TimeBehaviorComponent;
  let fixture: ComponentFixture<TimeBehaviorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeBehaviorComponent],
      providers: [BehaviorHandlerFactory, MapService],
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
        NgbModule.forRoot(),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeBehaviorComponent);
    component = fixture.componentInstance;

    const behavior = {
      handler: 'time',
      parameterName: 'TIME',
      options: {},
      calendarShowTime: true,
      calendarHourFormat: '24',
      calendarDateFormat: 'yy-mm-dd',
      uniqueId: '1',
      layerId: '1',
      mode: '',
      interval: 0
    };

    component.behavior = behavior;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
