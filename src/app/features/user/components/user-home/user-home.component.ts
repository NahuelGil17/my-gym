import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { User } from '@features/user/interfaces/user.interface';
import { GetUsers } from '@features/user/state/user.actions';
import { UsersState } from '@features/user/state/user.state';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html'
})
export class UserHomeComponent implements OnInit {
  @Select(UsersState.getUsers) users!: Observable<User[]>;
  @Select(UsersState.isLoading) loading!: Observable<boolean>;
  @Select(UsersState.getTotal) total!: Observable<number>;
  pageSize = environment.config.pageSize;
  defaultSort = 'name desc';
  filterValues: any | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(new GetUsers());
  }

  paginate(pageEvent: PageEvent): void {
    // TODO
  }
}
