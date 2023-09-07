import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() data: { nombre: string; routines: string[] } = { nombre: '', routines: [] };
}
