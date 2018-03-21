import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerPresentationComponent } from './layer-presentation.component';

describe('LayerPresentationComponent', () => {
  let component: LayerPresentationComponent;
  let fixture: ComponentFixture<LayerPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
