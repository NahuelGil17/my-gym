import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationHomeComponent } from './organization-home.component';

xdescribe('DashboardHomeComponent', () => {
  let component: OrganizationHomeComponent;
  let fixture: ComponentFixture<OrganizationHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationHomeComponent]
    });
    fixture = TestBed.createComponent(OrganizationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
