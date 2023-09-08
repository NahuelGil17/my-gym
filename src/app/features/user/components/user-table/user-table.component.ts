import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EColorBadge } from '@shared/enums/badge-color.enums';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html'
})
export class UserTableComponent {
  displayedColumns: string[] = ['nombre', 'apellido', 'activo', 'acciones'];

  badgeColor: typeof EColorBadge = EColorBadge;

  data = [
    {
      nombre: 'John',
      apellido: 'Doe',
      activo: true,
      acciones: 'Editar'
    },
    {
      nombre: 'Jane',
      apellido: 'Doe',
      activo: false,
      acciones: 'Eliminar'
    },
    {
      nombre: 'Bob',
      apellido: 'Smith',
      activo: true,
      acciones: 'Editar'
    },
    {
      nombre: 'Alice',
      apellido: 'Johnson',
      activo: false,
      acciones: 'Eliminar'
    }
  ];

  data$: Observable<any> = of(this.data);
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
