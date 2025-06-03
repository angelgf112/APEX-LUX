import { Injectable } from '@angular/core';
import { VEHICLES } from '../myvehicles';
import { Vehicle } from '../vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicles: Vehicle[] = VEHICLES;

  constructor() {}

  getVehicles(): Vehicle[] {
    return this.vehicles;
  }

  getVehicle(id: number): Vehicle | undefined {
    return this.vehicles.find((v) => v.id === id);
  }

  searchVehicle(model: string): number {
    return this.vehicles.findIndex((v) => v.model === model);
  }

  getVehicleById(id: number): Vehicle | undefined {
    return this.vehicles.find((vehicle) => vehicle.id === id);
  }
}
