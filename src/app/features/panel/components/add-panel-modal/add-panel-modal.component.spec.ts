import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPanelModalComponent } from './add-panel-modal.component';

xdescribe('AddPanelModalComponent', () => {
  let component: AddPanelModalComponent;
  let fixture: ComponentFixture<AddPanelModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPanelModalComponent]
    });
    fixture = TestBed.createComponent(AddPanelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
