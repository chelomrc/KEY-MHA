import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Cliente } from '../../models/cliente.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  totalClientes: number = 0;


  constructor(
    public http: HttpClient
  ) { }

  cargarClientes() {

    let url = URL_SERVICIOS + '/cliente';
    return this.http.get( url )
              .map( (resp: any) => {
                this.totalClientes = resp.total;
                return resp.clientes;
              });
  }

  cargarCliente( id: string ) {

    let url = URL_SERVICIOS + '/cliente/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.cliente );
  }

  guardarCliente( cliente: Cliente ) {

    let url = URL_SERVICIOS + '/cliente';

    if ( cliente._id ) {
      // actualizando
      url += '/' + cliente._id;
      // url += '?token=' + this._usuarioService.token;

      return this.http.put( url, cliente )
                .map( (resp: any) => {
                  // swal('Médico Actualizado', medico.nombre, 'success');
                  Swal.fire('Cliente Actualizada', cliente.nombre, 'success');
                  return resp.cliente;

                });

    } else {
      // creando
      // url += '?token=' + this._usuarioService.token;
      return this.http.post( url, cliente )
              .map( (resp: any) => {
                // swal('Médico Creado', medico.nombre, 'success');
                Swal.fire('Cliente Creada', cliente.nombre, 'success');
                return resp.cliente;
              });
    }
  }

  borrarCliente( id: string ) {

    let url = URL_SERVICIOS + '/cliente/' + id;
    // url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                // swal( 'Médico Borrado', 'Médico borrado correctamente', 'success' );
                Swal.fire('Cliente Borrada', 'Cliente borrada correctamente', 'success');
                return resp;
              });

  }

}
