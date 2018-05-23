import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapClickComponent} from './map-click.component';
import {KeepHtmlPipe} from '../../../shared/pipes/keep-html.pipe';
import {reducers} from '../../../store/app.reducers';
import {StoreModule} from '@ngrx/store';
import {TextFieldComponent} from '../../../shared/click-formatter/field/text-field/text-field.component';
import {UrlFieldComponent} from '../../../shared/click-formatter/field/url-field/url-field.component';
import {DateFieldComponent} from '../../../shared/click-formatter/field/date-field/date-field.component';
import {ImageFieldComponent} from '../../../shared/click-formatter/field/image-field/image-field.component';

describe('MapClickComponent', () => {
  let component: MapClickComponent;
  let fixture: ComponentFixture<MapClickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapClickComponent,
        KeepHtmlPipe,
        TextFieldComponent,
        DateFieldComponent,
        UrlFieldComponent,
        ImageFieldComponent
      ],
      imports: [
        StoreModule.forRoot(reducers),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
