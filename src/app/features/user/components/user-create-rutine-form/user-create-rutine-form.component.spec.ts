import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateRutineFormComponent } from './user-create-rutine-form.component';

describe('UserCreateRutineFormComponent', () => {
  let component: UserCreateRutineFormComponent;
  let fixture: ComponentFixture<UserCreateRutineFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCreateRutineFormComponent]
    });
    fixture = TestBed.createComponent(UserCreateRutineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
