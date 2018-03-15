import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LayerManagerComponent} from './layer-manager.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../store/app.reducers';
import {HttpLoaderFactory} from '../app.module';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {PopupComponent} from '../popup/popup.component';
import {LayerInformationComponent} from '../layer-information/layer-information.component';

describe('LayerManagerComponent', () => {
  let component: LayerManagerComponent;
  let fixture: ComponentFixture<LayerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayerManagerComponent, PopupComponent, LayerInformationComponent],
      imports: [
        StoreModule.forRoot(reducers),
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
    fixture = TestBed.createComponent(LayerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
