import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OpenLayersComponent} from './open-layers.component';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';
import {mapReducers} from '../../store';

describe('OpenLayersComponent', () => {
  let component: OpenLayersComponent;
  let fixture: ComponentFixture<OpenLayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpenLayersComponent],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
        HttpClientModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
