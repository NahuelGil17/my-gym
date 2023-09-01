import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EColorBadge } from '@shared/enums/badge-color.enums';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html'
})
export class UserTableComponent {
  displayedColumns: string[] = ['municipality', 'state', 'seats', 'status', 'memberSince', 'actions'];

  badgeColor: typeof EColorBadge = EColorBadge;

  data = [
    /* {
      municipality: 'Troutman',
      state: 'Alabama',
      seats: 5,
      status: 1,
      memberSince: '12/03/2023'
    },
    {
      municipality: 'Alabama',
      state: 'Florida',
      seats: 15,
      status: 2,
      memberSince: '12/05/2023'
    } */
  ];
  pageSize = environment.config.pageSize;

  @Input() users!: Observable<any[]>;
  @Input() total: number | null = 0;
  @Input() loading: boolean | null = false;
  @Input() filteredData = false;

  @Output() readonly editSeats = new EventEmitter<any>();
  @Output() readonly deactivate = new EventEmitter<any>();

  /**
   * Emit identifier to edit seats of an user
   * @param id User identifier
   */
  emitEditSeats(id: string): void {
    this.editSeats.emit(id);
  }

  /**
   * Emit identifier to deactivate user
   * @param id User identifier
   */
  emitDeactivate(id: string): void {
    this.deactivate.emit(id);
  }
}
