import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { ProfileComponent } from './profile/profile.component';

// Guards
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ReservaComponent } from './reservas/reserva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './clientes/cliente.component';
import { ProductosComponent } from './productos/productos.component';
import { ServiciosLavaderiaComponent } from './servicios-lavaderia/servicios-lavaderia.component';
import { RegistrosComponent } from './registros/registros.component';


const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ VerificaTokenGuard ],
        data: { titulo: 'Dashboard' }
    },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBars' } },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
    { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
    // Mantenimientos
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de Usuarios' }
    },
    { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico' } },

    // Mantenimientos hotel
    { path: 'registros', component: RegistrosComponent, data: { titulo: 'Actualizar Registros' } },
    { path: 'habitaciones', component: HabitacionesComponent, data: { titulo: 'Actualizar Habitaciones' } },
    { path: 'reservas', component: ReservasComponent, data: { titulo: 'Mantenimiento Reservas' } },
    { path: 'reserva/:id', component: ReservaComponent, data: { titulo: 'Actualizar Reserva' } },
    { path: 'clientes', component: ClientesComponent, data: { titulo: 'Mantenimiento Clientes' } },
    { path: 'cliente/:id', component: ClienteComponent, data: { titulo: 'Actualizar Cliente' } },
    { path: 'productos', component: ProductosComponent, data: { titulo: 'Mantenimiento Productos' } },
    { path: 'servicioslavanderia', component: ServiciosLavaderiaComponent, data: { titulo: 'Mantenimiento Servicios Lavandería' } },

    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
