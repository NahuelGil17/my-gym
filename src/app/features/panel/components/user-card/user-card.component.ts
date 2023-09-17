import { Component, Input } from '@angular/core';
import { Panel } from '@features/panel/interfaces/panel.interface';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() data!: Panel;
}
