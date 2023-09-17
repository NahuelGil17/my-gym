import { Component } from '@angular/core';
import { Breadcrumb } from '@core/interfaces/breadcrumb.interface';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  breadcrumbs: Breadcrumb[] = [
    {
      label: 'Usuarios',
      url: '/usuarios'
    },
    {
      label: 'Crear Usuario'
    }
  ];
}
