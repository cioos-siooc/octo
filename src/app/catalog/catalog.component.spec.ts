import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CatalogComponent} from './catalog.component';
import {reducers} from '../store/app.reducers';
import {StoreModule} from '@ngrx/store';
import {CategoryComponent} from './category/category.component';
import {FormsModule} from '@angular/forms';
import {HttpLoaderFactory} from '../app.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogComponent, CategoryComponent],
      imports: [
        StoreModule.forRoot(reducers),
        FormsModule,
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
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
