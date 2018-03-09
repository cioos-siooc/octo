import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerManagerComponent } from './layer-manager.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../store/app.reducers';

describe('LayerManagerComponent', () => {
  let component: LayerManagerComponent;
  let fixture: ComponentFixture<LayerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerManagerComponent ],
      imports: [
        StoreModule.forRoot(reducers),
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
