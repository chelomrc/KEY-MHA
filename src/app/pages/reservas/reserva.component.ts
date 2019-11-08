import { Component, OnInit } from '@angular/core';
import { ReservaService, UsuarioService } from '../../services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '../../models/reserva.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styles: []
})
export class ReservaComponent implements OnInit {

  reserva: Reserva = new Reserva('', '', '', '', '', '', '', '', '', '');
  fechaActual = new Date();
  bsValueIn = new Date();
  bsValueOut = new Date();

  usuarioReserva: string;
  fechaIn: Date;
  fechaOut: Date;
  fechaReserva = new Date();

  usuario:  Usuario;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService,
    public _reservaService: ReservaService,

    private bsLocaleService: BsLocaleService
  ) {
    this.usuario = this._usuarioService.usuario;
    this.usuarioReserva = this.usuario.nombre;
    this.bsLocaleService.use('es');

    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if ( id !== 'nuevo' ) {
        this.cargarReserva( id );
      }
    });
  }

  ngOnInit() {

    // Setear valores iniciales reserva
    this.bsValueIn.setDate(this.fechaActual.getDate() + 1);
    this.fechaIn = this.bsValueIn;
    this.bsValueOut.setDate(this.bsValueOut.getDate() + 2);
    this.fechaOut = this.bsValueOut;

    this._modalUploadService.notificacion
    .subscribe( () => {} );

  }


  cargarReserva( id: string ) {

    this._reservaService.cargarReserva( id )

          .subscribe( reserva => {
            this.reserva = reserva;
            this.fechaIn = new Date( reserva.fechaIn );
            this.fechaOut = new Date( reserva.fechaOut );
            this.fechaReserva = new Date( reserva.fecha );
            this.usuarioReserva = reserva.usuario.nombre;
            // console.log(reserva);
          });
  }

  guardarReserva( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    this.reserva.fecha = this.fechaReserva.toString();
    this.reserva.fechaIn = this.fechaIn.toString();
    this.reserva.fechaOut = this.fechaOut.toString();
    this.reserva.usuario = this.usuario._id;
    // console.log(this.reserva);
    if ( f.invalid ) {
      return;
    }

    this._reservaService.guardarReserva( this.reserva )
            .subscribe( reserva => {

              this.reserva._id = reserva._id;

              this.router.navigate(['/reserva', reserva._id ]);

            });

  }


}

