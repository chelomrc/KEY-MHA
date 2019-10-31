import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/reserva.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { ReservaService } from '../../services/reserva/reserva.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styles: []
})
export class ReservasComponent implements OnInit {

  reservas: Reserva[] = [];
  numeroReserva = 1;

  constructor(
    public _modalUploadService: ModalUploadService,
    public _reservaService: ReservaService
  ) { }

  ngOnInit() {
    this.cargarReservas();

    this._modalUploadService.notificacion
    .subscribe( () => this.cargarReservas() );
  }

  cargarReservas() {
    this._reservaService.cargarReservas()
            .subscribe( reservas => {
              this.reservas = reservas;
              // console.log(this.reservas);
            });
  }

  borrarReserva( reserva: Reserva ) {

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

        this._reservaService.borrarReserva( reserva._id )
        .subscribe( () => this.cargarReservas());

      }
    });


  }

}
