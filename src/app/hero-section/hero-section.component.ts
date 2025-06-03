import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DomseguroPipe } from '../domseguro.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [DomseguroPipe, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {
  video: string = 'JIVp3erJDMo';

  navItems = [{ path: '/vehicle', icon: 'directions_car', label: 'Vehículos' }];
}
