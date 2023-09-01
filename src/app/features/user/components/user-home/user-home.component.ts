import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html'
})
export class UserHomeComponent {
  users = of([
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    }
  ]);
  total = of(10);
  loading = of(false);

  pageSize = environment.config.pageSize;
  defaultSort = 'name desc';
  filterValues: any | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  paginate(pageEvent: PageEvent): void {
    // TODO
  }
}
