import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

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
}
