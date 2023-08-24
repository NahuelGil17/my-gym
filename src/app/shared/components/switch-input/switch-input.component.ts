/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, INJECTOR, Inject, Injector, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

/**
 * Component for a switch input.
 */
@Component({
  selector: 'app-switch-input',
  templateUrl: './switch-input.component.html',
  styleUrls: ['./switch-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchInputComponent),
      multi: true
    }
  ]
})
export class SwitchInputComponent implements OnInit, ControlValueAccessor {
  /**
   * The title of the switch component.
   */
  @Input() title!: string;

  /**
   * The caption of the switch component.
   */
  @Input() caption!: string;

  /**
   * A boolean indicating whether the switch input is checked or not.
   */
  checked = false;

  /**
   * The control for the switch input.
   */
  control!: NgControl;

  /**
   * A boolean indicating whether the switch input is disabled or not.
   */
  disabled = false;

  /**
   * The error message for the switch input.
   */
  errorMessage!: string;

  /**
   * A function that is called when the value of the switch input changes.
   * @param {any} value - The new value of the switch input.
   */
  onChange: any = () => {};

  /**
   * A function that is called when the switch input is touched.
   */
  onTouched: any = () => {};

  /**
   * Creates an instance of the SwitchInputComponent class.
   * @param {Injector} injector - The injector to use for the component.
   */
  constructor(@Inject(INJECTOR) private injector: Injector) {}

  ngOnInit(): void {
    this.control = this.injector.get(NgControl);
  }

  /**
   * Writes a value to the switch component.
   * @param {boolean} value The value to write.
   */
  writeValue(value: boolean): void {
    this.checked = value;
  }

  /**
   * Registers a callback function to call when the switch component value changes.
   * @param fn The callback function to register.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function to call when the switch component is touched.
   * @param fn The callback function to register.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the switch component.
   * @param {boolean} isDisabled A boolean value indicating whether the switch component should be disabled.
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Handles the change event of the switch component.
   * @param {boolean} value The new value of the switch component.
   */
  onModelChange(value: boolean): void {
    this.checked = value;
    this.onChange(value);
  }
}
