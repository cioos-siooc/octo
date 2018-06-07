import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CategoryComponent} from './category.component';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {mapReducers} from '@app/map/store';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      imports: [
        FormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
