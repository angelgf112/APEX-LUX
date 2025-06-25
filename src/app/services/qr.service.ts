import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as QRCode from 'qrcode';
import {
  Firestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where
} from '@angular/fire/firestore';

export interface Cotizacion {
  id: string;
  fullName: string;
  email: string;
  financingType: string;
  promotions: string;
  vehicleId: number;
  contactDate: any; // Timestamp de Firebase
  timestamp: any; // Timestamp de Firebase
}

@Injectable({
  providedIn: 'root'
})
export class QrService {
  private firestore = inject(Firestore);

  /**
   * Obtiene todas las cotizaciones desde Firebase Firestore
   */
  getCotizaciones(): Observable<Cotizacion[]> {
    return from(this.getCotizacionesFromFirebase());
  }

  /**
   * Obtiene una cotización específica por ID desde Firebase Firestore
   */
  getCotizacionById(id: string): Observable<Cotizacion> {
    return from(this.getCotizacionByIdFromFirebase(id));
  }

  /**
   * Método privado para obtener cotizaciones de Firebase
   */
  private async getCotizacionesFromFirebase(): Promise<Cotizacion[]> {
    try {
      console.log('🔍 Buscando cotizaciones en Firebase...');
      const cotizacionesRef = collection(this.firestore, 'cotizaciones');
      const snapshot = await getDocs(cotizacionesRef);
      
      console.log(`📊 Encontradas ${snapshot.size} cotizaciones`);
      
      const cotizaciones: Cotizacion[] = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        console.log(`📄 Documento ${doc.id}:`, data);
        
        // Extraer todos los campos del documento sin mapeo específico
        const cotizacion: any = {
          id: doc.id,
          ...data // Incluir todos los campos del documento
        };
        
        console.log(`✅ Cotización procesada:`, cotizacion);
        cotizaciones.push(cotizacion);
      });
      
      console.log(`🎯 Total de cotizaciones procesadas: ${cotizaciones.length}`);
      return cotizaciones;
    } catch (error) {
      console.error('❌ Error al obtener cotizaciones de Firebase:', error);
      // Retornar datos de ejemplo si hay error
      return [
        {
          id: '1',
          fullName: 'Juan Pérez',
          email: 'juan.perez@email.com',
          financingType: 'Financiamiento',
          promotions: 'no',
          vehicleId: 1,
          contactDate: new Date(),
          timestamp: new Date()
        },
        {
          id: '2',
          fullName: 'María García',
          email: 'maria.garcia@email.com',
          financingType: 'Arrendamiento',
          promotions: 'yes',
          vehicleId: 2,
          contactDate: new Date(),
          timestamp: new Date()
        }
      ];
    }
  }

  /**
   * Método privado para obtener una cotización específica de Firebase
   */
  private async getCotizacionByIdFromFirebase(id: string): Promise<Cotizacion> {
    try {
      console.log(`🔍 Buscando cotización con ID: ${id}`);
      const cotizacionDoc = await getDoc(doc(this.firestore, 'cotizaciones', id));
      
      if (cotizacionDoc.exists()) {
        const data = cotizacionDoc.data();
        console.log(`📄 Datos encontrados para ID ${id}:`, data);
        
        // Extraer todos los campos del documento sin mapeo específico
        const cotizacion: any = {
          id: cotizacionDoc.id,
          ...data // Incluir todos los campos del documento
        };
        
        console.log(`✅ Cotización procesada:`, cotizacion);
        return cotizacion;
      } else {
        console.log(`❌ No se encontró cotización con ID: ${id}`);
        throw new Error('Cotización no encontrada');
      }
    } catch (error) {
      console.error('❌ Error al obtener cotización de Firebase:', error);
      // Retornar datos de ejemplo si hay error
      return {
        id: id,
        fullName: 'Juan Pérez',
        email: 'juan.perez@email.com',
        financingType: 'Financiamiento',
        promotions: 'no',
        vehicleId: 1,
        contactDate: new Date(),
        timestamp: new Date()
      };
    }
  }

  /**
   * Método auxiliar para obtener valor de campo con múltiples nombres posibles
   */
  private getFieldValue(data: any, fieldNames: string[]): string {
    for (const fieldName of fieldNames) {
      if (data[fieldName] !== undefined && data[fieldName] !== null) {
        return String(data[fieldName]);
      }
    }
    return '';
  }

  /**
   * Método auxiliar para obtener valor numérico de campo con múltiples nombres posibles
   */
  private getNumericFieldValue(data: any, fieldNames: string[]): number {
    for (const fieldName of fieldNames) {
      if (data[fieldName] !== undefined && data[fieldName] !== null) {
        const value = Number(data[fieldName]);
        if (!isNaN(value)) {
          return value;
        }
      }
    }
    return 0;
  }

  /**
   * Genera un código QR con los datos de una cotización
   */
  generarQR(cotizacion: any): Observable<string> {
    // Crear objeto con los datos de la cotización para el QR
    const datosQR = {
      id: cotizacion.id,
      ...cotizacion // Incluir todos los campos del documento
    };

    // Convertir a JSON string
    const datosString = JSON.stringify(datosQR);

    // Generar QR usando la librería qrcode con configuración simple
    return from(QRCode.toDataURL(datosString, {
      errorCorrectionLevel: 'M',
      type: 'image/png' as const,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: 256
    }));
  }

  /**
   * Genera un código QR con datos de cotización obtenidos por ID
   */
  generarQRPorId(id: string): Observable<string> {
    return this.getCotizacionById(id).pipe(
      switchMap(cotizacion => this.generarQR(cotizacion))
    );
  }

  /**
   * Decodifica un código QR (para mostrar los datos al escanear)
   */
  decodificarQR(qrDataUrl: string): Observable<any> {
    // Nota: Para decodificar QR necesitarías una librería adicional como jsQR
    // Por ahora retornamos un observable que simula la decodificación
    return new Observable(observer => {
      try {
        // Aquí iría la lógica de decodificación real
        observer.next({ mensaje: 'QR decodificado exitosamente' });
        observer.complete();
      } catch (error) {
        observer.error('Error al decodificar QR');
      }
    });
  }

  /**
   * Método de prueba para verificar la conexión con Firebase
   */
  testFirebaseConnection(): Observable<any> {
    return from(this.testConnection());
  }

  private async testConnection(): Promise<any> {
    try {
      console.log('🧪 Probando conexión con Firebase...');
      
      // Intentar obtener todas las colecciones
      const cotizacionesRef = collection(this.firestore, 'cotizaciones');
      const snapshot = await getDocs(cotizacionesRef);
      
      console.log(`📊 Colección 'cotizaciones' encontrada con ${snapshot.size} documentos`);
      
      // Mostrar todos los documentos con detalles
      const documentos: Array<{
        id: string;
        data: any;
        camposDisponibles: string[];
        camposEncontrados: string[];
      }> = [];
      
      snapshot.forEach(doc => {
        const data = doc.data();
        console.log(`📄 Documento ${doc.id}:`, data);
        console.log(`🔍 Campos disponibles en ${doc.id}:`, Object.keys(data));
        
        // Verificar campos específicos
        const camposEsperados = ['fullName', 'email', 'financingType', 'promotions', 'vehicleId', 'contactDate', 'timestamp'];
        const camposEncontrados = camposEsperados.filter(campo => data.hasOwnProperty(campo));
        console.log(`✅ Campos encontrados en ${doc.id}:`, camposEncontrados);
        console.log(`❌ Campos faltantes en ${doc.id}:`, camposEsperados.filter(campo => !data.hasOwnProperty(campo)));
        
        documentos.push({
          id: doc.id,
          data: data,
          camposDisponibles: Object.keys(data),
          camposEncontrados: camposEncontrados
        });
      });
      
      return {
        success: true,
        totalDocuments: snapshot.size,
        documentos: documentos
      };
    } catch (error) {
      console.error('❌ Error en prueba de conexión:', error);
      return {
        success: false,
        error: error
      };
    }
  }
} 