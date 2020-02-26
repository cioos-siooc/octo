/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumBehaviorComponent } from './enum-behavior.component';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {mapReducers} from '@app/map/store';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '@app/shared/shared.module';
import { BehaviorHandlerFactory } from '@app/map/utils';

class BehaviorHandlerFactoryMock {}

describe('EnumBehaviorComponent', () => {
  let component: EnumBehaviorComponent;
  let fixture: ComponentFixture<EnumBehaviorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumBehaviorComponent ],
      providers: [
        {
          provide: BehaviorHandlerFactory,
          useClass: BehaviorHandlerFactoryMock
        }
      ],
      imports: [
        FormsModule,
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
    fixture = TestBed.createComponent(EnumBehaviorComponent);
    component = fixture.componentInstance;

    const currentPossibility = {
      label: '',
      value: '',
      isDefault: true
    };

    const behavior = {
      handler: 'enum',
      parameterName: '',
      label: '',
      possibilities: [],
      uniqueId: '1',
      layerId: '1',
      currentValue: currentPossibility,
    };

    component.behavior = behavior;
    component.currentPossibility = currentPossibility;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
