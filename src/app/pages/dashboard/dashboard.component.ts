import { Habitacion } from './../../models/habitacion.model';
import { Component, OnInit } from '@angular/core';
import { HabitacionService } from '../../services/service.index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  fecha = new Date();
  fecha1 = new Date();
  arregloDias: Date[] = [];
  habitaciones: Habitacion [] = [];

  constructor(
              public _habitacionService: HabitacionService
  ) {
  }

  ngOnInit() {
    this._habitacionService.cargarHabitaciones()
          .subscribe( habitaciones => {
              this.habitaciones = habitaciones;
          });
    this.crearArreglo( this.fecha );
  }

  crearArreglo( fecha: Date ) {

    for (let i = 0; i < 15; i++) {
      this.arregloDias[i] = new Date();
      this.arregloDias[i].setDate( fecha.getDate() + i);
    }
    // console.log(this.arregloDias);
    console.log(this.fecha);
  }

  desplazarDias( dias: number) {

    if ( dias === 0 ) {
      this.fecha = new Date();
    }
    this.fecha.setDate(this.fecha.getDate() + dias );

    this.crearArreglo( this.fecha );

  }

}
