import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Reserva } from '../../models/reserva.model';
import Swal from 'sweetalert2';

@Injectable()
export class ReservaService {

  totalReservas: number = 0;


  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService

  ) { }

  cargarReservas() {

    let url = URL_SERVICIOS + '/reserva';
    return this.http.get( url )
              .map( (resp: any) => {
                this.totalReservas = resp.total;
                return resp.reservas;
              });
  }

  cargarReserva( id: string ) {

    let url = URL_SERVICIOS + '/reserva/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.reserva );
  }

  guardarReserva( reserva: Reserva ) {

    let url = URL_SERVICIOS + '/reserva';

    if ( reserva._id ) {
      // actualizando
      url += '/' + reserva._id;
      // url += '?token=' + this._usuarioService.token;

      return this.http.put( url, reserva )
                .map( (resp: any) => {
                  // swal('Médico Actualizado', medico.nombre, 'success');
                  Swal.fire('Reserva Actualizada', reserva.nombre, 'success');
                  return resp.reserva;

                });

    } else {
      // creando
      // url += '?token=' + this._usuarioService.token;
      return this.http.post( url, reserva )
              .map( (resp: any) => {
                // swal('Médico Creado', medico.nombre, 'success');
                Swal.fire('Reserva Creada', reserva.nombre, 'success');
                return resp.reserva;
              });
    }
  }

  borrarReserva( id: string ) {

    let url = URL_SERVICIOS + '/reserva/' + id;
    // url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                // swal( 'Médico Borrado', 'Médico borrado correctamente', 'success' );
                Swal.fire('Reserva Borrada', 'Reserva borrada correctamente', 'success');
                return resp;
              });

  }

}
