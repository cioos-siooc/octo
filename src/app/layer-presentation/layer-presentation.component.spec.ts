import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerPresentationComponent } from './layer-presentation.component';
import {HttpLoaderFactory} from '../app.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../store/app.reducers';

describe('LayerPresentationComponent', () => {
  let component: LayerPresentationComponent;
  let fixture: ComponentFixture<LayerPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerPresentationComponent ],
      imports: [
        StoreModule.forRoot(reducers),
        HttpClientModule,
        FormsModule,
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
    fixture = TestBed.createComponent(LayerPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
