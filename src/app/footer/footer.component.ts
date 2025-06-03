import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    MatDividerModule,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  teamMembers = [
    {
      name: 'Angel Garza Flores',
      role: 'Desarrollador Frontend',
      degree: 'Ing. en Sistemas Computacionales',
      photoUrl: 'img/angel.jpg',
    },
    {
      name: 'Abraham Barrientos Esquivel',
      role: 'Diseñador UI/UX',
      degree: 'Ing. en Sistemas Computacionales',
      photoUrl: 'img/borrarDespues.png',
    },
    {
      name: 'Diego Vazques Reyes',
      role: 'Diseñador UI/UX',
      degree: 'Ing. en Sistemas Computacionales',
      photoUrl: 'img/diego.jpg',
    },
    {
      name: 'David Menchaca Lora',
      role: 'Diseñador UI/UX',
      degree: 'Ing. en Sistemas Computacionales',
      photoUrl: 'img/borrarDespues.png',
    },
    {
      name: 'Angel Ramses Martinez',
      role: 'Diseñador UI/UX',
      degree: 'Ing. en Sistemas Computacionales',
      photoUrl: 'img/borrarDespues.png',
    },
    {
      name: 'Luis Humberto Ramirez Gutierrez',
      role: 'Diseñador UI/UX',
      degree: 'Ing. en Sistemas Computacionales',
      photoUrl: 'img/borrarDespues.png',
    },
  ];
}
