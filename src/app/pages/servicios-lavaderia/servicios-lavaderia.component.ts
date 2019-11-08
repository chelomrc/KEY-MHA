import { ServicioLavanderia } from './../../models/servicioLavanderia';
import { Component, OnInit } from '@angular/core';
import { ServiciosLavanderiaService } from '../../services/service.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios-lavaderia',
  templateUrl: './servicios-lavaderia.component.html',
  styles: []
})
export class ServiciosLavaderiaComponent implements OnInit {
  serviciosLavanderia: ServicioLavanderia[] = [];
  numeroServicioLavanderia = 1;

  constructor(
    public _servicioLavanderiaService: ServiciosLavanderiaService
  ) { }

  ngOnInit() {
    this.cargarServicioLavanderias();
  }

  cargarServicioLavanderias() {
    this._servicioLavanderiaService.cargarServiciosLavanderia()
            .subscribe( serviciosLavanderia => {
              this.serviciosLavanderia = serviciosLavanderia;
              // console.log(this.serviciosLavanderia);
            });
  }

  borrarServicioLavanderia( servicioLavanderia: ServicioLavanderia ) {

    Swal.fire({
      title: 'Estás Seguro?',
      text: 'Ésta acción no se puede revertir!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.value) {

        this._servicioLavanderiaService.borrarServicioLavanderia( servicioLavanderia._id )
        .subscribe( () => this.cargarServicioLavanderias());

      }
    });
  }

  guardarServicioLavanderia( servicioLavanderia: ServicioLavanderia ) {

    this._servicioLavanderiaService.actualizarServicioLavanderia( servicioLavanderia )
    .subscribe();
  }

  crearServicioLavanderia() {

    let nombre: string;
    let precio: string;

    Swal.fire({
      title: 'Nombre Servicio',
      text: 'Ingrese Nombre del Servicio',
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
        title: 'Precio Servicio',
        text: 'Introduce el Precio',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Siguiente',
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value) {
              precio = value;
              this._servicioLavanderiaService.crearServicioLavanderia( nombre, precio )
              .subscribe( () => this.cargarServicioLavanderias());
              resolve();

            } else {
              resolve('Tienes que ingresar el Precio');
            }
          });
        }
      });

    });

  }

}
