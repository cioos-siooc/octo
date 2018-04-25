import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFieldComponent } from './image-field.component';
import {FormsModule} from '@angular/forms';

describe('ImageFieldComponent', () => {
  let component: ImageFieldComponent;
  let fixture: ComponentFixture<ImageFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageFieldComponent ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
