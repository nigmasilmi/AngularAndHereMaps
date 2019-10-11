import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizableMapComponentComponent } from './customizable-map-component.component';

describe('CustomizableMapComponentComponent', () => {
  let component: CustomizableMapComponentComponent;
  let fixture: ComponentFixture<CustomizableMapComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizableMapComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizableMapComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
