import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    title: 'Inicio - ApexAutomotive',
  },
  {
    path: 'vehicles',
    loadComponent: () =>
      import('./vehicle/vehicle.component').then((m) => m.VehicleComponent),
    title: 'Vehículos - ApexAutomotive',
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./servicess/servicess.component').then(
        (m) => m.ServicesComponent
      ),
    title: 'Servicios - ApexAutomotive',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact/contact.component').then((m) => m.ContactComponent),
    title: 'Contacto - ApexAutomotive',
  },
  {
    path: 'vehicle-details/:id',
    loadComponent: () =>
      import('./vehicle-details/vehicle-details.component').then((m) => m.VehicleDetails),
    title: 'Detalles del vehículo',
  },
  {
    path: 'login', // <-- Agregado para login
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    title: 'Login - ApexAutomotive',
  },
  {
    path: 'admin-panel',
    loadComponent: () =>
      import('./admin-panel/admin-panel.component').then(
        (m) => m.AdminPanelComponent
      ),
    title: 'Panel de Administración - ApexAutomotive',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
