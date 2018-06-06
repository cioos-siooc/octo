import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LayerInformationComponent} from './layer-information.component';
import {StoreModule} from '@ngrx/store';
import {mapReducers} from '../../store';

describe('LayerInformationComponent', () => {
  let component: LayerInformationComponent;
  let fixture: ComponentFixture<LayerInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayerInformationComponent],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
