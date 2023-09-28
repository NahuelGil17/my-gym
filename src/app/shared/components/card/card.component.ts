import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { parseExercises } from '@core/utilities/helpers';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges {
  constructor() {
    this.day = '';
    this.endTime = '';
    this.startTime = '';
    this.exercises = [];
  }

  @Input() day: string;
  @Input() endTime: string;
  @Input() startTime: string;
  @Input() exercises: string[];
  exercisesParced!: {
    exerciseName: string;
    series?: number;
    reps: string;
  }[];

  @Output() readonly deleteRoutineEvent = new EventEmitter<void>();
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exercises']) {
      this.exercisesParced = parseExercises(changes['exercises'].currentValue);
    }
  }
  deleteRoutine(): void {
    this.deleteRoutineEvent.emit();
  }
}
