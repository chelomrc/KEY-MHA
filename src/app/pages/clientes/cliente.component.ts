import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services/service.index';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: []
})
export class ClienteComponent implements OnInit {

  cliente: Cliente = new Cliente ('', '', '', '', '', '', '', '', '', '', '', '', '', '');

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,

    public _clienteService: ClienteService,

  ) {
    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if ( id !== 'nuevo' ) {
        this.cargarCliente( id );
      }
    });
  }

  ngOnInit() {

  }

  cargarCliente( id: string ) {

    this._clienteService.cargarCliente( id )

          .subscribe( cliente => {
            this.cliente = cliente;
            // this.fechaIn = new Date( cliente.fechaIn );
            // this.fechaOut = new Date( cliente.fechaOut );
            // this.fechaCliente = new Date( cliente.fecha );
            // this.usuarioCliente = cliente.usuario.nombre;
            // console.log(cliente);
          });
  }


  guardarCliente ( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );


    if ( f.invalid ) {
      return;
    }

    this._clienteService.guardarCliente( this.cliente )
            .subscribe( cliente => {

              this.cliente._id = cliente._id;

              this.router.navigate(['/cliente', cliente._id ]);

            });
  }

}
