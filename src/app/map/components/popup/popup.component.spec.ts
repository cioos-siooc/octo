import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PopupComponent} from './popup.component';
import {reducers} from '../../../store/app.reducers';
import {StoreModule} from '@ngrx/store';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupComponent],
      imports: [StoreModule.forRoot(reducers)]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
