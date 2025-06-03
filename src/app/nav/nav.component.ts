import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenu, MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule
  ],
})
export class NavComponent {
  navItems = [
    { path: '/', icon: 'home', label: 'Inicio' },
    { path: '/vehicle', icon: 'directions_car', label: 'Vehículos' },
    { path: '/services', icon: 'build', label: 'Servicios' },
    { path: '/contact', icon: 'contact_mail', label: 'Contacto' },
  ];

  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // Lo manda al inicio después de logout
  }
}
