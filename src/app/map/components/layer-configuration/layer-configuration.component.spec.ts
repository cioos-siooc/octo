/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerConfigurationComponent } from './layer-configuration.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '@app/shared/shared.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { mapReducers } from '@app/map/store';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientPresentation, ClickStrategy, ClickFormatterInfo } from '@app/shared/models';

@Component({selector: 'app-time-behavior', template: ''})
class TimeBehaviorComponent {
  @Input() behavior: any;
}

@Component({selector: 'app-enum-behavior', template: ''})
class EnumBehaviorComponent {
  @Input() behavior: any;
}

@Component({selector: 'app-dynamic-enum-behavior', template: ''})
class DynamicEnumBehaviorComponent {
  @Input() behaviorUniqueId: any;
}

describe('LayerConfigurationComponent', () => {
  let component: LayerConfigurationComponent;
  let fixture: ComponentFixture<LayerConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayerConfigurationComponent,
        TimeBehaviorComponent,
        EnumBehaviorComponent,
        DynamicEnumBehaviorComponent
      ],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        FormsModule,
        NgbModule.forRoot(),
      ],
      providers: [
        NgbActiveModal,
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerConfigurationComponent);
    component = fixture.componentInstance;

    const clientPresentation: ClientPresentation = {
      id: 0,
      styleDef: '',
      namedStyle: 'testStyle',
      legendUrl: '',
      legendLabel: '',
      layerId: 0,
      isDefault: true
    };

    const clickStrategy: ClickStrategy = {
      id: 0,
      type: '',
      emptyValidatorCode: '',
    };

    const clickFormatterInfo: ClickFormatterInfo = {
      id: 0,
      type: '',
      formatterDef: ''
    };

    const layer = {
      id: 0,
      type: 'wms',
      zIndex: 0,
      opacity: 0,
      title: 'testLayer',
      description: {
        id: 0,
        description: 'test description',
        layerId: 0
      },
      isVisible: false,
      defaultCrs: 'EPSG:4326',
      url: '',
      urlParameters: '',
      code: 'testLayer',
      languageCode: 'en',
      clientPresentations: [ clientPresentation ],
      currentClientPresentation: clientPresentation,
      clickStrategy: clickStrategy,
      clickFormatterInfo: clickFormatterInfo,
      urlBehaviors: '',
      isCollapsed: false,
      priority: 1,
      defaulPriority: 0,
      isUnremovable: false
    };
    component.layer = layer;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
