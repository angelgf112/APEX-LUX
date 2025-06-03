import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule, CarouselComponent } from 'ngx-owl-carousel-o';
import { Vehicle } from '../vehicle';
import { Router, RouterModule } from '@angular/router';
import { VehicleService } from '../shared/vehicle.service';

@Component({
  selector: 'app-featured-section',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CarouselModule,
    RouterModule,
  ],
  templateUrl: './featured-section.component.html',
  styleUrls: ['./featured-section.component.css'],
})
export class FeaturedSectionComponent {
  @Input() featuredVehicles: Vehicle[] = [];
  @ViewChild('owlCarousel', { static: false }) owlCarousel!: CarouselComponent;

  constructor(private vehicleService: VehicleService, private router: Router) {}

  carouselOptions = {
    loop: true,
    margin: 20,
    nav: false,
    dots: true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 3 },
    },
  };

  viewDetails(id: number) {
    this.router.navigate(['/vehicle-details', id]);
  }
}
