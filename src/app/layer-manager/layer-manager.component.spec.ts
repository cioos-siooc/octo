import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LayerManagerComponent} from './layer-manager.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../store/app.reducers';
import {HttpLoaderFactory} from '../app.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TimeBehaviorComponent} from './time-behavior/time-behavior.component';
import {UrlBehaviorService} from './url-behavior.service';

describe('LayerManagerComponent', () => {
  let component: LayerManagerComponent;
  let fixture: ComponentFixture<LayerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayerManagerComponent, TimeBehaviorComponent],
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
      ],
      providers: [UrlBehaviorService]
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
