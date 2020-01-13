import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicEnumBehaviorComponent } from './dynamic-enum-behavior.component';

describe('DynamicEnumBehaviorComponent', () => {
  let component: DynamicEnumBehaviorComponent;
  let fixture: ComponentFixture<DynamicEnumBehaviorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicEnumBehaviorComponent ]
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
});
