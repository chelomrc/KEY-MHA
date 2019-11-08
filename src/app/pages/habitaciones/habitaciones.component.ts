import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { HabitacionService } from '../../services/habitacion/habitacion.service';
import { Habitacion } from '../../models/habitacion.model';
import Swal from 'sweetalert2';
import { stringify } from 'querystring';



@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styles: []
})
export class HabitacionesComponent implements OnInit {

  habitaciones: Habitacion[] = [];
  tipoHabitacion: string [] = [
    'SIMPLE',
    'DOBLE',
    'TRIPLE',
    'SWB',
    'MAT',
    'DWB',
    'TWB',
    'SUITE'
  ];

  constructor(
    public _modalUploadService: ModalUploadService,
    public _habitacionService: HabitacionService
  ) {
  }

  ngOnInit() {

    this.cargarHabitaciones();
    this._modalUploadService.notificacion
    .subscribe( () => this.cargarHabitaciones() );
  }

  cargarHabitaciones() {
    this._habitacionService.cargarHabitaciones()
            .subscribe( habitaciones => {
              this.habitaciones = habitaciones;
            });
  }

  buscarHabitacion( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarHabitaciones();
      return;
    }
    this._habitacionService.buscarHabitacion( termino )
            .subscribe( habitaciones => this.habitaciones = habitaciones );
  }

  guardarHabitacion( habitacion: Habitacion ) {

    this._habitacionService.actualizarHabitacion( habitacion )
    .subscribe();
  }

  borrarHabitacion( habitacion: Habitacion ) {

    this._habitacionService.borrarHabitacion( habitacion._id )
    .subscribe( () => this.cargarHabitaciones());
  }


  crearHabitacion() {

    let nombre: string;
    let tipo: string;


    Swal.fire({
      title: 'Crear Habitacion',
      text: 'Ingrese nombre/número de Habitación',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Siguiente',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((valor) => {

      if ( !valor.value || valor.value.length === 0) {
        return;
      }

      nombre = valor.value;

      Swal.fire({
        title: 'Crear Habitacion',
        text: 'Seleccione el Tipo de Habitación',
        input: 'select',
        inputOptions: {
          SIMPLE: 'SIMPLE',
          DOBLE: 'DOBLE',
          TRIPLE: 'TRIPLE',
          SWB: 'SWB',
          MAT: 'MAT',
          DWB: 'DWB',
          TWB: 'TWB',
          SUITE: 'SUITE'
        },
        inputPlaceholder: 'Selecione el Tipo',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Siguiente',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value) {
              tipo = value;
              this._habitacionService.crearHabitacion( nombre, tipo )
              .subscribe( () => this.cargarHabitaciones());
              resolve();

            } else {
              resolve('Tienes que seleccionar un Tipo');
            }
          });
        }
      });

    });

  }

}
