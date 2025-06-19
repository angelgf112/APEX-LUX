import { Component } from '@angular/core';
import { VehicleService } from '../shared/vehicle.service';
import { Vehicle } from '../vehicle';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { FeaturedSectionComponent } from '../featured-section/featured-section.component';
import { FeaturesSectionComponent } from '../features-section/features-section.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    FeaturedSectionComponent,
    FeaturesSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  featuredVehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    const featuredIds = [2, 3, 6, 16, 17, 21, 23];
    this.featuredVehicles = this.vehicleService
      .getVehicles()
      .filter((vehicle) => featuredIds.includes(vehicle.id));
  }
}
