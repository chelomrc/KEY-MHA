import { ServicioLavanderia } from './../../models/servicioLavanderia';
import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiciosLavanderiaService {

  totalServicioLavanderia: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  cargarServiciosLavanderia() {

    let url = URL_SERVICIOS + '/serviciolavanderia';
    return this.http.get( url )
              .map( (resp: any) => {
                this.totalServicioLavanderia = resp.total;
                return resp.serviciosLavanderia;
              });
  }

  cargarServicioLavanderia( id: string ) {

    let url = URL_SERVICIOS + '/serviciolavanderia/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.serviciolavanderia );
  }

  guardarServicioLavanderia( serviciolavanderia: ServicioLavanderia ) {

    let url = URL_SERVICIOS + '/serviciolavanderia';

    if ( serviciolavanderia._id ) {
      // actualizando
      url += '/' + serviciolavanderia._id;
      // url += '?token=' + this._usuarioService.token;

      return this.http.put( url, serviciolavanderia )
                .map( (resp: any) => {
                  // swal('Médico Actualizado', medico.nombre, 'success');
                  Swal.fire('ServicioLavanderia Actualizada', serviciolavanderia.nombre, 'success');
                  return resp.serviciolavanderia;

                });

    } else {
      // creando
      // url += '?token=' + this._usuarioService.token;
      return this.http.post( url, serviciolavanderia )
              .map( (resp: any) => {
                // swal('Médico Creado', medico.nombre, 'success');
                Swal.fire('ServicioLavanderia Creada', serviciolavanderia.nombre, 'success');
                return resp.serviciolavanderia;
              });
    }
  }

  borrarServicioLavanderia( id: string ) {

    let url = URL_SERVICIOS + '/serviciolavanderia/' + id;
    // url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                // swal( 'Médico Borrado', 'Médico borrado correctamente', 'success' );
                Swal.fire('ServicioLavanderia Borrada', 'ServicioLavanderia borrada correctamente', 'success');
                return resp;
              });

  }

  crearServicioLavanderia( nombre: string, precio: string ) {

    let url = URL_SERVICIOS + '/serviciolavanderia';

    return this.http.post( url, { nombre, precio } )
              .map( (resp: any) => {

                // swal('Habitación Creada', 'Habitación: ' + resp.serviciolavanderia.nombre, 'success');
                Swal.fire(
                  'ServicioLavanderia Creado',
                  resp.servicioLavanderia.nombre,
                  'success'
                );
                return resp.serviciolavanderia;
              } );
  }

  actualizarServicioLavanderia( serviciolavanderia: ServicioLavanderia ) {

    let url = URL_SERVICIOS + '/serviciolavanderia/' + serviciolavanderia._id;
    // url += '?token=' + this._usuarioService.token;

    return this.http.put( url, serviciolavanderia )
              .map( (resp: any) => {
                Swal.fire('Habitación Actualizada', serviciolavanderia.nombre, 'success');
                // swal('Habitación Actualizada', serviciolavanderia.nombre, 'success');
                return resp.hospital;
              });

  }
}
