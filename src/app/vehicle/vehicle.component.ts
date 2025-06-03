// vehicles.component.ts
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../shared/vehicle.service';
import { Vehicle } from '../vehicle';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent {
  // Tipo de vehiculo seleccionado en el filtro
  selectedType = 'all';

  // Lista de tipos disponibles
  vehicleTypes = ['SUV', 'Coupe', 'Pickup', 'Performance'];

  // Lista de vehiculos obtenidos del servicio
  vehicles: any[] = [];

  // Opciones de financiamiento para el formulario
  financingOptions = ['Crédito bancario', 'Arrendamiento', 'Pago de contado'];

  // Fecha actual (para limitar fecha minima en el datepicker)
  today: Date = new Date();

  // ID del vehiculo que tiene abierto el formulario
  selectedVehicleId: number | null = null;

  // Estado de hover por vehiculo (para efectos visuales)
  isHovered: { [key: number]: boolean } = {};

  // Datos del formulario de cotizacion
  quoteData = {
    fullName: '',
    email: '',
    financingType: '',
    promotions: '',
    contactDate: '',
  };

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // Se ejecuta al cargar el componente, obtiene los vehiculos del servicio
  ngOnInit(): void {
    this.vehicles = this.vehicleService.getVehicles();
  }

  // Getter para filtrar vehiculos segun el tipo seleccionado
  get filteredVehicles() {
    if (this.selectedType === 'all') return this.vehicles;
    return this.vehicles.filter((v) => v.type === this.selectedType);
  }

  // Navegar al componente de detalles con el ID del vehiculo
  viewDetails(id: number) {
    this.router.navigate(['/vehicle-details', id]);
  }

  // Muestra o esconde el formulario de cotizacion
  toggleQuoteForm(vehicleId: number): void {
    if (this.selectedVehicleId === vehicleId) {
      // Si ya estaba abierto, se cierra y se limpia
      this.selectedVehicleId = null;
      this.resetForm();
    } else {
      // Si no, se abre el formulario para ese vehiculo
      this.selectedVehicleId = vehicleId;
    }
  }

  // Reinicia los campos del formulario
  resetForm() {
    this.quoteData = {
      fullName: '',
      email: '',
      financingType: '',
      promotions: '',
      contactDate: '',
    };
  }

  // Envia los datos del formulario si es valido
  submitQuote(form: any) {
    if (form.valid) {
      // Obtiene cotizaciones guardadas en localStorage
      const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');

      // Agrega la nueva cotizacion
      storedQuotes.push({
        vehicleId: this.selectedVehicleId,
        ...this.quoteData,
      });

      // Guarda de nuevo en localStorage
      localStorage.setItem('quotes', JSON.stringify(storedQuotes));

      // Muestra mensaje de exito
      this.snackBar.open('Cotización enviada exitosamente.', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-success'],
      });

      // Cierra el formulario y lo resetea
      this.selectedVehicleId = null;
      this.resetForm();
    }
  }

  // Devuelve un color segun el tipo de vehiculo (para la tarjeta)
  getTypeColor(type: string): string {
    const colorMap: { [key: string]: string } = {
      SUV: '#2196F3',
      Coupe: '#F44336',
      Pickup: '#4CAF50',
      Performance: '#9C27B0',
    };
    return colorMap[type] || '#607D8B';
  }
}
