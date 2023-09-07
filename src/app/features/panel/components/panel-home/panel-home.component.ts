import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'panel',
  templateUrl: './panel-home.component.html',
  styleUrls: ['./panel-home.component.scss']
})
export class PanelHomeComponent implements OnInit {
  items: { nombre: string; routines: string[] }[] = [];

  get halfCount(): number {
    return Math.ceil(this.items.length / 2);
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.items = [
      { nombre: 'Juan', routines: ['pecho', 'espalda', 'brazo', 'pierna'] },
      { nombre: 'Ana', routines: ['hombros', 'abdominales', 'cardio', 'brazo'] },
      { nombre: 'Luis', routines: ['pierna', 'espalda', 'pecho', 'cardio'] },
      { nombre: 'María', routines: ['cardio', 'abdominales', 'hombros', 'pierna'] },
      { nombre: 'Carlos', routines: ['brazo', 'hombros', 'cardio', 'abdominales'] },
      { nombre: 'Lucía', routines: ['espalda', 'brazo', 'hombros', 'pecho'] },
      { nombre: 'Diego', routines: ['abdominales', 'pierna', 'brazo', 'hombros'] },
      { nombre: 'Isabel', routines: ['cardio', 'pecho', 'espalda', 'brazo'] }
    ];

    /*
    this.http.get<{ nombre: string, routines: string[] }[]>('URL').subscribe(data => {
      this.data = data;
    }, error => {
      console.error('error in obtaining routines:', error);
    });
    */
  }
}
