import { Producto } from './../../models/producto.model';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  totalProductos: number = 0;


  constructor(
    public http: HttpClient
  ) { }

  cargarProductos() {

    let url = URL_SERVICIOS + '/producto';
    return this.http.get( url )
              .map( (resp: any) => {
                this.totalProductos = resp.total;
                return resp.productos;
              });
  }

  cargarProducto( id: string ) {

    let url = URL_SERVICIOS + '/producto/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.producto );
  }

  guardarProducto( producto: Producto ) {

    let url = URL_SERVICIOS + '/producto';

    if ( producto._id ) {
      // actualizando
      url += '/' + producto._id;
      // url += '?token=' + this._usuarioService.token;

      return this.http.put( url, producto )
                .map( (resp: any) => {
                  // swal('Médico Actualizado', medico.nombre, 'success');
                  Swal.fire('Producto Actualizada', producto.nombre, 'success');
                  return resp.producto;

                });

    } else {
      // creando
      // url += '?token=' + this._usuarioService.token;
      return this.http.post( url, producto )
              .map( (resp: any) => {
                // swal('Médico Creado', medico.nombre, 'success');
                Swal.fire('Producto Creada', producto.nombre, 'success');
                return resp.producto;
              });
    }
  }

  borrarProducto( id: string ) {

    let url = URL_SERVICIOS + '/producto/' + id;
    // url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                // swal( 'Médico Borrado', 'Médico borrado correctamente', 'success' );
                Swal.fire('Producto Borrada', 'Producto borrada correctamente', 'success');
                return resp;
              });

  }

  crearProducto( nombre: string, precio: string ) {

    let url = URL_SERVICIOS + '/producto';

    return this.http.post( url, { nombre, precio } )
              .map( (resp: any) => {

                // swal('Habitación Creada', 'Habitación: ' + resp.producto.nombre, 'success');
                Swal.fire(
                  'Producto Creado',
                  resp.producto.nombre,
                  'success'
                );
                return resp.producto;
              } );
  }

  actualizarProducto( producto: Producto ) {

    let url = URL_SERVICIOS + '/producto/' + producto._id;
    // url += '?token=' + this._usuarioService.token;

    return this.http.put( url, producto )
              .map( (resp: any) => {
                Swal.fire('Habitación Actualizada', producto.nombre, 'success');
                // swal('Habitación Actualizada', producto.nombre, 'success');
                return resp.hospital;
              });

  }
}
