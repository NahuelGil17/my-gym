import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  currentTime: string = new Date().toLocaleTimeString();
  currentSecond: number = new Date().getSeconds();
  currentHour: number = new Date().getHours();

  ngOnInit() {
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

  onSecondChange() {
    console.log('Second has changed!');
  }

  onHourChange() {
    //HACER PEDIDO PARA OBTENER LOS USUARIOS
  }
}
