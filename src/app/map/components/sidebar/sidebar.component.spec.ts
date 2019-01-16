import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogComponent } from '@app/map/components/catalog/catalog.component';
import { LayerManagerComponent } from '@app/map/components/layer-manager/layer-manager.component';
import { LayerComponent } from '@app/map/components/layer-manager/layer/layer.component';
import { LayerPickerComponent } from '@app/map/components/layer-picker/layer-picker.component';
import { DateFieldComponent } from '@app/map/components/map-click/click-formatter/field/date-field/date-field.component';
import { ImageFieldComponent } from '@app/map/components/map-click/click-formatter/field/image-field/image-field.component';
import { TextFieldComponent } from '@app/map/components/map-click/click-formatter/field/text-field/text-field.component';
import { UrlFieldComponent } from '@app/map/components/map-click/click-formatter/field/url-field/url-field.component';
import { MapClickComponent } from '@app/map/components/map-click/map-click.component';
import { TopicPickerComponent } from '@app/map/components/topic-picker/topic-picker.component';
import { mapReducers } from '@app/map/store';
import { KeepHtmlPipe } from '@app/shared/pipes';
import { HttpLoaderFactory } from '@app/shared/shared.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CategoryComponent } from './../catalog/category/category.component';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        LayerManagerComponent,
        LayerPickerComponent,
        LayerComponent,
        TopicPickerComponent,
        CatalogComponent,
        MapClickComponent,
        CategoryComponent,
        TextFieldComponent,
        UrlFieldComponent,
        DateFieldComponent,
        ImageFieldComponent,
        KeepHtmlPipe
      ],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
        NgbModalModule.forRoot(),
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
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
