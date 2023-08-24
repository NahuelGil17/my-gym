import { ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { BtnDirective } from '@shared/directives/btn/btn.directive';
import { InputDirective } from '@shared/directives/input/input.directive';
import { RenderResult, render } from '@testing-library/angular';
import { OrganizationFormComponent } from './organization-form.component';

describe('OrganizationFormComponent', () => {
  let component: OrganizationFormComponent;
  let fixture: ComponentFixture<OrganizationFormComponent>;
  let renderResult: RenderResult<OrganizationFormComponent>;

  beforeEach(async () => {
    renderResult = await render(OrganizationFormComponent, {
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
