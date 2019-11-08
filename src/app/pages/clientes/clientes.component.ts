import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/service.index';
import { Cliente } from '../../models/cliente.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  numeroCliente = 1;

  constructor(
    public _clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this._clienteService.cargarClientes()
            .subscribe( clientes => {
              this.clientes = clientes;
              // console.log(this.clientes);
            });
  }

  borrarCliente( cliente: Cliente ) {

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

        this._clienteService.borrarCliente( cliente._id )
        .subscribe( () => this.cargarClientes());

      }
    });


  }

}
