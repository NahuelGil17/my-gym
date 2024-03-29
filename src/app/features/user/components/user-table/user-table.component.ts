import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserState } from '@features/user/state/user.state';
import { Select } from '@ngxs/store';
import { EColorBadge } from '@shared/enums/badge-color.enums';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html'
})
export class UserTableComponent {
  displayedColumns: string[] = ['name', 'lastName', 'isActive', 'acciones'];

  badgeColor: typeof EColorBadge = EColorBadge;

  pageSize = environment.config.pageSize;

  @Input() users!: Observable<any[]>;
  @Input() total: number | null = 0;
  @Select(UserState.isLoading) loading!: Observable<boolean>;
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
