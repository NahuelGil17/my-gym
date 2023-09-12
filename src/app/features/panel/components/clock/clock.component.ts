import { Component, OnInit } from '@angular/core';
import { GetPanels } from '@features/panel/state/panel.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  currentTime: string = new Date().toLocaleTimeString();
  currentSecond: number = new Date().getSeconds();
  currentHour: number = new Date().getHours();
  currentDay: string = this.getDayName(new Date().getDay());

  constructor(private store: Store) {}

  ngOnInit(): void {
    setInterval(() => {
      const now = new Date();

      if (now.getSeconds() !== this.currentSecond) {
        this.currentSecond = now.getSeconds();
        this.onSecondChange();
      }

      if (now.getHours() !== this.currentHour) {
        this.currentHour = now.getHours();
        this.onHourChange();
      }

      this.currentTime = now.toLocaleTimeString();
    }, 1000);
  }

  onSecondChange(): void {
    this.store.dispatch(
      new GetPanels({
        day: this.currentDay,
        startTime: this.currentHour.toString(),
        endTime: (this.currentHour + 1).toString()
      })
    );
  }

  onHourChange(): void {
    //HACER PEDIDO PARA OBTENER LOS USUARIOS
  }
  getDayName(dayNumber: number): string {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    return days[dayNumber];
  }
}
