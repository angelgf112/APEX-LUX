import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QrService, Cotizacion } from '../services/qr.service';
import {
  Firestore,
  doc,
  getDoc
} from '@angular/fire/firestore';

@Component({
  selector: 'app-qr-viewer',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './qr-viewer.component.html',
  styleUrls: ['./qr-viewer.component.css']
})
export class QrViewerComponent implements OnInit {
  private firestore = inject(Firestore);
  cotizacion: any = null;
  isLoading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private qrService: QrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.cargarCotizacion(id);
      }
    });
  }

  async cargarCotizacion(id: string): Promise<void> {
    this.isLoading = true;
    this.error = '';

    try {
      const cotizacionDoc = await getDoc(doc(this.firestore, 'cotizaciones', id));
      
      if (cotizacionDoc.exists()) {
        const data = cotizacionDoc.data();
        console.log('📄 Datos completos de la cotización:', data);
        
        // Incluir todos los campos del documento
        this.cotizacion = {
          id: cotizacionDoc.id,
          ...data // Incluir todos los campos del documento
        };
        
        console.log('✅ Cotización cargada:', this.cotizacion);
      } else {
        this.error = 'Cotización no encontrada. Verifica que el ID sea correcto.';
      }
    } catch (error) {
      console.error('Error al cargar cotización:', error);
      this.error = 'Error al cargar la cotización. Verifica tu conexión.';
    } finally {
      this.isLoading = false;
    }
  }

  formatearPrecio(precio: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD'
    }).format(precio);
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  obtenerColorEstado(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'aprobada':
        return '#27ae60';
      case 'pendiente':
        return '#f39c12';
      case 'rechazada':
        return '#e74c3c';
      default:
        return '#7f8c8d';
    }
  }

  /**
   * Obtiene las claves del objeto cotización
   */
  getObjectKeys(obj: any): string[] {
    if (!obj) return [];
    return Object.keys(obj).filter(key => key !== 'id'); // Excluir el ID del display
  }

  /**
   * Obtiene el valor de una propiedad del objeto de forma segura
   */
  getValue(obj: any, key: string): any {
    return obj ? obj[key] : undefined;
  }

  /**
   * Obtiene la clase CSS para el valor según su tipo
   */
  getValueClass(value: any): string {
    if (typeof value === 'number') return 'value-number';
    if (typeof value === 'boolean') return 'value-boolean';
    if (value === null || value === undefined) return 'value-null';
    if (typeof value === 'object') return 'value-object';
    return 'value-string';
  }

  /**
   * Formatea el valor para mostrar
   */
  formatFieldValue(value: any): string {
    if (value === null || value === undefined) {
      return 'No disponible';
    }
    
    // Manejar timestamps de Firebase
    if (value && typeof value === 'object' && value.toDate) {
      try {
        return value.toDate().toLocaleString('es-MX', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch {
        return 'Fecha inválida';
      }
    }
    
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    
    if (typeof value === 'boolean') {
      return value ? 'Sí' : 'No';
    }
    
    if (typeof value === 'number') {
      // Si parece ser un precio
      if (value > 1000) {
        return this.formatearPrecio(value);
      }
      return value.toLocaleString();
    }
    
    // Si es una fecha
    if (typeof value === 'string' && (value.includes('-') || value.includes('/'))) {
      try {
        return this.formatearFecha(value);
      } catch {
        return value;
      }
    }
    
    return String(value);
  }
} 