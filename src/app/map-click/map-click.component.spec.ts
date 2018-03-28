import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapClickComponent} from './map-click.component';
import {KeepHtmlPipe} from '../pipes/keep-html.pipe';
import {reducers} from '../store/app.reducers';
import {StoreModule} from '@ngrx/store';

describe('MapClickComponent', () => {
  let component: MapClickComponent;
  let fixture: ComponentFixture<MapClickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapClickComponent,
        KeepHtmlPipe
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
