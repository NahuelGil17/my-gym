import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrganizationStatus } from '@core/enums/status.enum';
import { EColorBadge } from '@shared/enums/badge-color.enums';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-organization-table',
  templateUrl: './organization-table.component.html',
  styleUrls: ['./organization-table.component.scss']
})
export class OrganizationTableComponent {
  displayedColumns: string[] = ['municipality', 'state', 'seats', 'status', 'memberSince', 'actions'];

  organizationStatus: typeof OrganizationStatus = OrganizationStatus;
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

  @Input() organizations!: Observable<any[]>;
  @Input() total: number | null = 0;
  @Input() loading: boolean | null = false;
  @Input() filteredData = false;

  @Output() readonly editSeats = new EventEmitter<any>();
  @Output() readonly deactivate = new EventEmitter<any>();

  /**
   * Emit identifier to edit seats of an organization
   * @param id Organization identifier
   */
  emitEditSeats(id: string): void {
    this.editSeats.emit(id);
  }

  /**
   * Emit identifier to deactivate organization
   * @param id Organization identifier
   */
  emitDeactivate(id: string): void {
    this.deactivate.emit(id);
  }
}
