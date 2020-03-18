import { MapService } from '@app/map/utils/open-layers';
import { mapReducers } from '@app/map/store';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicEnumBehaviorComponent } from './dynamic-enum-behavior.component';

describe('DynamicEnumBehaviorComponent', () => {
  let component: DynamicEnumBehaviorComponent;
  let fixture: ComponentFixture<DynamicEnumBehaviorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicEnumBehaviorComponent ],
      imports: [
        FormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('map', mapReducers),
      ],
      providers: [MapService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicEnumBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
