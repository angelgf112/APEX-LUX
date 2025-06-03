import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../shared/vehicle.service';
import { Vehicle } from '../vehicle';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-vehicle-details',
  standalone: true, // Asegúrate de que esté marcado como standalone
  imports: [CommonModule, MatCardModule, MatIcon, MatProgressSpinnerModule], // Agregar módulos necesarios
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css',
})
export class VehicleDetails {
  vehicle: Vehicle | undefined;

  constructor(
    private route: ActivatedRoute, // Inyecta ActivatedRoute
    private vehicleService: VehicleService, // Inyecta el servicio de vehículos
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtén el id del vehículo desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Llama al servicio para obtener el vehículo por el id
    this.vehicle = this.vehicleService.getVehicleById(id);
  }

  goBack() {
    this.router.navigate(['/vehicles']); // Redirigir a la página de vehículos
  }
}
