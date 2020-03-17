import { Input } from '@angular/core';
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DateFieldComponent } from '@app/map/components/map-click/click-formatter/field/date-field/date-field.component';
import { ImageFieldComponent } from '@app/map/components/map-click/click-formatter/field/image-field/image-field.component';
import { TextFieldComponent } from '@app/map/components/map-click/click-formatter/field/text-field/text-field.component';
import { UrlFieldComponent } from '@app/map/components/map-click/click-formatter/field/url-field/url-field.component';
import { MapClickComponent } from '@app/map/components/map-click/map-click.component';
import { mapReducers } from '@app/map/store';
import { ClickFormatterInfo, ClickStrategy, ClientPresentation, LayerInformation } from '@app/shared/models';
import { Layer } from '@app/shared/models/layer.model';
import { KeepHtmlPipe } from '@app/shared/pipes';
import { HttpLoaderFactory } from '@app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LayerComponent } from './layer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layer-information',
  template: ''
})
class LayerInformationStubComponent {
  @Input() layerId: number;
}

describe('LayerComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayerComponent,
        TestHostComponent,
        MapClickComponent,
        KeepHtmlPipe,
        TextFieldComponent,
        UrlFieldComponent,
        ImageFieldComponent,
        DateFieldComponent,
        LayerInformationStubComponent
      ],
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
        FormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  @Component({
    selector: 'app-host-component',
    template: '<app-layer [layer]="layer"></app-layer>'
  })
  class TestHostComponent implements OnInit {
    layer: Layer;

    ngOnInit() {
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

      this.layer = {
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
        defaultPriority: 0,
        isUnremovable: false,
        alwaysOnTop: false
      };
    }
  }
});
