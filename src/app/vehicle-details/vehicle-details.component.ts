declare const paypal: any;
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../shared/vehicle.service';
import { Vehicle } from '../vehicle';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-vehicle-details',
  standalone: true, // Asegúrate de que esté marcado como standalone
  imports: [
    CommonModule,
    MatCardModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ], // Agregar módulos necesarios
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css',
})
export class VehicleDetails implements OnInit {
  vehicle: Vehicle | undefined;
  isLogged = false;
  private paypalButtonRendered = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute, // Inyecta ActivatedRoute
    private vehicleService: VehicleService, // Inyecta el servicio de vehículos
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vehicle = this.vehicleService.getVehicleById(id);

    this.authService.isLogged$.subscribe((logged) => {
      this.isLogged = logged;
    });
  }

  renderPaypalButton() {
    if (!this.vehicle) return;

    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.vehicle!.price.toString(),
                  currency_code: 'MXN',
                },
                description: `Compra de vehículo: ${this.vehicle!.model}`,
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            this.snackBar.open(
              `Pago completado por ${details.payer.name.given_name}`,
              'Cerrar',
              {
                duration: 3000,
                verticalPosition: 'top',
              }
            );
            // Aquí puedes agregar lógica para guardar la orden, etc.
          });
        },
        onError: (err: any) => {
          console.error('Error en el pago:', err);
          this.snackBar.open(
            'Ocurrió un error durante el pago. Intenta nuevamente.',
            'Cerrar',
            {
              duration: 3000,
              verticalPosition: 'top',
            }
          );
        },
      })
      .render('#paypal-button-container');
  }

  ngAfterViewChecked(): void {
    const paypalContainer = document.getElementById('paypal-button-container');

    if (this.isLogged && paypalContainer && !this.paypalButtonRendered) {
      this.renderPaypalButton();
      this.paypalButtonRendered = true;
    }

    if (!this.isLogged && this.paypalButtonRendered) {
      const container = document.getElementById('paypal-button-container');
      if (container) container.innerHTML = '';
      this.paypalButtonRendered = false;
    }
  }

  goBack() {
    this.router.navigate(['/vehicles']); // Redirigir a la página de vehículos
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
