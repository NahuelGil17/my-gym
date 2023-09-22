import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { GetPanels } from '@features/panel/state/panel.actions';
import { Store } from '@ngxs/store';
import { AddPanelModalComponent } from '../add-panel-modal/add-panel-modal.component';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  currentTime: string = new Date().toLocaleTimeString();
  currentHour: number = new Date().getHours();
  currentHourFormatted: string = this.formatHour(this.currentHour);
  currentDay: string = this.getDayName(new Date().getDay());

  constructor(private store: Store, private dialog: Dialog) {}

  ngOnInit(): void {
    this.onHourChange();

    setInterval(() => {
      const now = new Date();

      if (now.getHours() !== this.currentHour) {
        this.currentHour = now.getHours();
        this.currentHourFormatted = this.formatHour(this.currentHour);
        this.onHourChange();
      }

      this.currentTime = now.toLocaleTimeString();
    }, 1000);
  }

  formatHour(hour: number): string {
    return `${String(hour).padStart(2, '0')}:00:00.000`;
  }

  onHourChange(): void {
    const nextHour = (this.currentHour + 1) % 24;

    this.store.dispatch(
      new GetPanels({
        day: this.currentDay,
        startTime: this.currentHourFormatted,
        endTime: this.formatHour(nextHour)
      })
    );
  }

  getDayName(dayNumber: number): string {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    return days[dayNumber];
  }

  addPanel(): void {
    this.dialog.open(AddPanelModalComponent, {
      height: '400px',
      width: '600px'
    });
  }
}
