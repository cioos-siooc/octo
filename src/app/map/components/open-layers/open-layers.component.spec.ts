import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OpenLayersComponent} from './open-layers.component';
import {reducers} from '../../../store/app.reducers';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';

describe('OpenLayersComponent', () => {
  let component: OpenLayersComponent;
  let fixture: ComponentFixture<OpenLayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpenLayersComponent],
      imports: [
        StoreModule.forRoot(reducers),
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
