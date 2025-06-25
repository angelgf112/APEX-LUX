import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { QrService, Cotizacion } from '../services/qr.service';

@Component({
  selector: 'app-qr-generator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.css']
})
export class QrGeneratorComponent implements OnInit {
  cotizaciones: Cotizacion[] = [];
  cotizacionSeleccionada: Cotizacion | null = null;
  qrCodeUrl: string = '';
  isLoading: boolean = false;
  cotizacionSeleccionadaId: string = '';

  constructor(
    private qrService: QrService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarCotizaciones();
  }

  /**
   * Carga todas las cotizaciones desde la API
   */
  cargarCotizaciones(): void {
    console.log('🚀 Iniciando carga de cotizaciones...');
    this.isLoading = true;
    this.qrService.getCotizaciones().subscribe({
      next: (cotizaciones) => {
        console.log('📋 Cotizaciones recibidas:', cotizaciones);
        this.cotizaciones = cotizaciones;
        console.log(`✅ Se cargaron ${cotizaciones.length} cotizaciones`);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error al cargar cotizaciones:', error);
        this.snackBar.open('Error al cargar las cotizaciones', 'Cerrar', {
          duration: 3000
        });
        this.isLoading = false;
      }
    });
  }

  /**
   * Genera un código QR para la cotización seleccionada
   */
  generarQR(): void {
    if (!this.cotizacionSeleccionada) {
      this.snackBar.open('Por favor selecciona una cotización', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    this.isLoading = true;
    this.qrService.generarQR(this.cotizacionSeleccionada).subscribe({
      next: (qrUrl) => {
        this.qrCodeUrl = qrUrl;
        this.isLoading = false;
        this.snackBar.open('Código QR generado exitosamente', 'Cerrar', {
          duration: 2000
        });
      },
      error: (error) => {
        console.error('Error al generar QR:', error);
        this.snackBar.open('Error al generar el código QR', 'Cerrar', {
          duration: 3000
        });
        this.isLoading = false;
      }
    });
  }

  /**
   * Genera un código QR por ID de cotización
   */
  generarQRPorId(): void {
    if (!this.cotizacionSeleccionadaId) {
      this.snackBar.open('Por favor ingresa un ID de cotización', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    this.isLoading = true;
    this.qrService.generarQRPorId(this.cotizacionSeleccionadaId).subscribe({
      next: (qrUrl) => {
        this.qrCodeUrl = qrUrl;
        this.isLoading = false;
        this.snackBar.open('Código QR generado exitosamente', 'Cerrar', {
          duration: 2000
        });
      },
      error: (error) => {
        console.error('Error al generar QR por ID:', error);
        this.snackBar.open('Error al generar el código QR', 'Cerrar', {
          duration: 3000
        });
        this.isLoading = false;
      }
    });
  }

  /**
   * Descarga el código QR como imagen
   */
  descargarQR(): void {
    if (!this.qrCodeUrl) {
      this.snackBar.open('No hay código QR para descargar', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    const link = document.createElement('a');
    link.download = `cotizacion-${this.cotizacionSeleccionada?.id || 'qr'}.png`;
    link.href = this.qrCodeUrl;
    link.click();
  }

  /**
   * Limpia el código QR generado
   */
  limpiarQR(): void {
    this.qrCodeUrl = '';
    this.cotizacionSeleccionada = null;
    this.cotizacionSeleccionadaId = '';
  }

  /**
   * Prueba la conexión con Firebase
   */
  probarConexion(): void {
    console.log('🧪 Iniciando prueba de conexión...');
    this.qrService.testFirebaseConnection().subscribe({
      next: (result) => {
        console.log('✅ Resultado de prueba:', result);
        if (result.success) {
          this.snackBar.open(`Conexión exitosa. ${result.totalDocuments} documentos encontrados`, 'Cerrar', {
            duration: 5000
          });
        } else {
          this.snackBar.open('Error en la conexión con Firebase', 'Cerrar', {
            duration: 3000
          });
        }
      },
      error: (error) => {
        console.error('❌ Error en prueba de conexión:', error);
        this.snackBar.open('Error al probar la conexión', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  /**
   * Formatea el precio para mostrar
   */
  formatearPrecio(precio: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD'
    }).format(precio);
  }
} 