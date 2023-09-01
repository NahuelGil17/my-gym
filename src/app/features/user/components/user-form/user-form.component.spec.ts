import { ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { BtnDirective } from '@shared/directives/btn/btn.directive';
import { InputDirective } from '@shared/directives/input/input.directive';
import { RenderResult, render } from '@testing-library/angular';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let renderResult: RenderResult<UserFormComponent>;

  beforeEach(async () => {
    renderResult = await render(UserFormComponent, {
      declarations: [InputDirective, BtnDirective],
      imports: [ReactiveFormsModule, FormsModule, MatRadioModule]
    });
    component = renderResult.fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = renderResult.fixture;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
