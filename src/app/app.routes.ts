import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { ReservarComponent } from './pages/reservar/reservar.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'servicios', component: ServiciosComponent }, // Added route
    { path: 'marcas', component: MarcasComponent },       // Added route
    { path: 'contacto', component: ContactoComponent },   // Added route
    { path: 'reservar', component: ReservarComponent },
    { path: '**', redirectTo: '' }
];
