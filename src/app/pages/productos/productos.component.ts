import { Producto } from './../../models/producto.model';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/service.index';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  numeroProducto = 1;

  public oculto: string = 'oculto';

  constructor(
    public _productoService: ProductoService
  ) { }

  ngOnInit() {
    this.cargarProductos();
  }

  mostrarModal( ) {
    this.oculto = '';
  }
  cerrarModal() {

    this.oculto = 'oculto';
  }


  cargarProductos() {
    this._productoService.cargarProductos()
            .subscribe( productos => {
              this.productos = productos;
              // console.log(this.productos);
            });
  }

  borrarProducto( producto: Producto ) {

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

        this._productoService.borrarProducto( producto._id )
        .subscribe( () => this.cargarProductos());

      }
    });
  }

  guardarProducto( producto: Producto ) {

    this._productoService.actualizarProducto( producto )
    .subscribe();
  }

  crearProducto() {

    let nombre: string;
    let precio: string;
    let costo: string;

    Swal.fire({
      title: 'Nombre Producto',
      text: 'Ingrese Nombre del Producto',
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
        title: 'Precio Producto',
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
              this._productoService.crearProducto( nombre, precio )
              .subscribe( () => this.cargarProductos());
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
