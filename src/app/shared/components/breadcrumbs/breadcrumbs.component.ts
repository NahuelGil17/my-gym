import { Component, Input } from '@angular/core';
import { Breadcrumb } from '@core/interfaces/breadcrumb.interface';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs!: Breadcrumb[];
}
