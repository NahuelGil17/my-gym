import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { whiteSpaceValidator } from '@core/validators/whitespace.validator';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss']
})
export class FiltersBarComponent implements OnInit, OnDestroy {
  filterForm!: FormGroup;
  destroy = new Subject<void>();

  @Output() readonly formValues = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      searchQ: [null, [whiteSpaceValidator]],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(500), // Add a debounce time of 500 milliseconds
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        if (this.filterForm.valid) this.formValues.emit(this.filterForm.value);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  reset(): void {
    this.filterForm.reset();
  }
}
