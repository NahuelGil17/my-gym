import { Component } from '@angular/core';
import { Breadcrumb } from '@core/interfaces/breadcrumb.interface';

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.scss']
})
export class OrganizationCreateComponent {
  breadcrumbs: Breadcrumb[] = [
    {
      label: 'Organizations',
      url: '/organizations'
    },
    {
      label: 'Create organization'
    }
  ];
}
