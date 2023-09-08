import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { User } from '@features/user/interfaces/user.interface';
import { GetUsers } from '@features/user/state/user.actions';
import { UserState } from '@features/user/state/user.state';
import { Actions, Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html'
})
export class UserHomeComponent implements OnInit, OnDestroy {
  @Select(UserState.getUsers) users!: Observable<User[]>;
  @Select(UserState.isLoading) loading!: Observable<boolean>;
  @Select(UserState.getTotal) total!: Observable<number>;

  pageSize = environment.config.pageSize;
  defaultSort = 'name desc';
  filterValues: any | null = null;

  private destroy = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store, private actions: Actions) {}

  ngOnInit(): void {
    const payload = {
      page: 1,
      pageSize: this.pageSize
    };
    this.store.dispatch(new GetUsers(payload));
  }

  paginate(pageEvent: PageEvent): void {
    const currentPage = pageEvent.pageIndex + 1; // Ajuste porque pageIndex es base 0
    const currentPageSize = pageEvent.pageSize;
    const payload = {
      page: currentPage,
      pageSize: currentPageSize
    };
    this.store.dispatch(new GetUsers(payload));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
