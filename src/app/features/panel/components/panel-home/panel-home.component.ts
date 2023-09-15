import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { PanelState } from '@features/panel/state/panel.state';
import { Panel } from '@features/panel/interfaces/panel.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panel',
  templateUrl: './panel-home.component.html',
  styleUrls: ['./panel-home.component.scss']
})
export class PanelHomeComponent implements OnInit {
  store = inject(Store);
  items$: Observable<Panel[]> = this.store.select(PanelState.panels) || [];
  items: Panel[] = [];

  get halfCount(): number {
    return Math.ceil(this.items.length / 2);
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.items$.subscribe((items) => {
      this.items = items;
    });
  }
}
