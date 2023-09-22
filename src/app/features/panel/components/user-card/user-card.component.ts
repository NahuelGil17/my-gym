import { Component, Input } from '@angular/core';
import { Panel } from '@features/panel/interfaces/panel.interface';
import { RemovePanel } from '@features/panel/state/panel.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() data!: Panel;
  isHovering = false;

  constructor(private store: Store) {}
  removePanel(id: string): void {
    this.store.dispatch(new RemovePanel(id));
  }
}
