import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelHomeComponent } from './panel-home.component';

describe('PanelComponent', () => {
  let component: PanelHomeComponent;
  let fixture: ComponentFixture<PanelHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelHomeComponent]
    });
    fixture = TestBed.createComponent(PanelHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
