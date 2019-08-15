import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumBehaviorComponent } from './enum-behavior.component';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {mapReducers} from '@app/map/store';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '@app/shared/shared.module';

describe('EnumBehaviorComponent', () => {
  let component: EnumBehaviorComponent;
  let fixture: ComponentFixture<EnumBehaviorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumBehaviorComponent ],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
