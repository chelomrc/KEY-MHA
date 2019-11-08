import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styles: []
})
export class RegistrosComponent implements OnInit {

  modal1: string = 'oculto';
  modal2: string = 'oculto';
  modal3: string = 'oculto';

  constructor() { }

  ngOnInit() {
  }

  mostrarModal() {
    this.modal1 = '';
    this.modal2 = 'oculto';
    this.modal3 = 'oculto';
  }

  paso2() {
    this.modal1 = 'oculto';
    this.modal2 = '';
  }
  paso3() {
    this.modal2 = 'oculto';
    this.modal3 = '';
  }

  cerrarModal() {
    this.modal1 = 'oculto';
    this.modal2 = 'oculto';
    this.modal3 = 'oculto';
  }

  guardar() {

    this.cerrarModal();
  }

}
