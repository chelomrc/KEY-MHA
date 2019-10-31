import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';

import Swal from 'sweetalert2';
import { Habitacion } from '../../models/habitacion.model';

@Injectable()
export class HabitacionService {

  totalHabitaciones: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {   }


  cargarHabitaciones() {


    let url = URL_SERVICIOS + '/habitacion';
    return this.http.get( url )
              .map( (resp: any) => {
                this.totalHabitaciones = resp.total;
                return resp.habitaciones;
              });

  }

  crearHabitacion( nombre: string, tipo: string ) {

    let url = URL_SERVICIOS + '/habitacion';

    return this.http.post( url, { nombre, tipo } )
              .map( (resp: any) => {

                // swal('Habitación Creada', 'Habitación: ' + resp.habitacion.nombre, 'success');
                Swal.fire(
                  'Habitación Creada',
                  resp.habitacion.nombre,
                  'success'
                );
                return resp.habitacion;
              } );

  }

  buscarHabitacion( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/habitaciones/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.habitaciones );

  }

  actualizarHabitacion( habitacion: Habitacion ) {

    let url = URL_SERVICIOS + '/habitacion/' + habitacion._id;
    // url += '?token=' + this._usuarioService.token;

    return this.http.put( url, habitacion )
              .map( (resp: any) => {
                Swal.fire('Habitación Actualizada', habitacion.nombre, 'success');
                // swal('Habitación Actualizada', habitacion.nombre, 'success');
                return resp.hospital;
              });

  }

  borrarHabitacion( id: string ) {

    let url = URL_SERVICIOS + '/habitacion/' + id;
    // url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp => Swal.fire('Habitación Borrada', 'Eliminado correctamente', 'success') );
                // .map( resp => swal('Habitación Borrada', 'Eliminado correctamente', 'success') );

  }

}

