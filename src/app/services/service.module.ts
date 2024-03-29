import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  AdminGuard,
  SubirArchivoService,
  HospitalService,
  MedicoService,
  HabitacionService,
  ReservaService,
  ClienteService,
  ProductoService,
  ServiciosLavanderiaService,
  VerificaTokenGuard
 } from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    HabitacionService,
    ReservaService,
    ClienteService,
    ProductoService,
    ServiciosLavanderiaService,
    VerificaTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
