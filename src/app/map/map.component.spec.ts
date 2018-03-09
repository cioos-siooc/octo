import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapComponent} from './map.component';
import {OpenLayersComponent} from './open-layers/open-layers.component';
import {PopupComponent} from '../popup/popup.component';
import {CatalogComponent} from '../catalog/catalog.component';
import {TopicPickerComponent} from '../topic-picker/topic-picker.component';
import {LayerManagerComponent} from '../layer-manager/layer-manager.component';
import {reducers} from '../store/app.reducers';
import {StoreModule} from '@ngrx/store';
import {FormsModule} from '@angular/forms';
import {CategoryComponent} from '../catalog/category/category.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent, OpenLayersComponent, PopupComponent, CatalogComponent, TopicPickerComponent, LayerManagerComponent,
        CategoryComponent],
      imports: [
        StoreModule.forRoot(reducers),
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
