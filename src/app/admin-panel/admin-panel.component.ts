import { CommonModule,JsonPipe } from '@angular/common';
import { Component,OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
  DocumentData,
  CollectionReference,
  Timestamp,
} from '@angular/fire/firestore';
import { Observable, Subscription, map, timestamp } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface EditableDocument extends DocumentData {
  id: string; // El ID que nos da Firestore
  isEditing?: boolean; // Para controlar el estado de la UI
  originalState?: any; // Para guardar el estado antes de editar
}

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule,
  FormsModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {
   // Observables para los datos en tiempo real de Firestore.
  public cotizaciones: EditableDocument[] = [];
  public contactos: EditableDocument[] = [];

  private cotizacionesSub!: Subscription;
  private contactosSub!: Subscription;

  // --- ORDEN DE CAMPOS DEFINIDO ---
  private readonly quoteFieldOrder = ['fullName', 'email', 'financingType', 'promotions', 'vehicleId', 'contactDate', 'timestamp'];
  private readonly contactFieldOrder = ['name', 'email', 'subject', 'contactMethod', 'date', 'message'];

  constructor(private firestore: Firestore, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadData();
  }
  
  ngOnDestroy() {
    if (this.cotizacionesSub) this.cotizacionesSub.unsubscribe();
    if (this.contactosSub) this.contactosSub.unsubscribe();
  }

  private loadData() {
    const cotizacionesCollection = collection(this.firestore, 'cotizaciones') as CollectionReference<EditableDocument>;
    const contactosCollection = collection(this.firestore, 'contactos') as CollectionReference<EditableDocument>;

    const cotizaciones$ = collectionData(cotizacionesCollection, { idField: 'id' }).pipe(
      map(items => items.map(item => ({ ...item, isEditing: false })))
    );
    
    const contactos$ = collectionData(contactosCollection, { idField: 'id' }).pipe(
      map(items => items.map(item => ({ ...item, isEditing: false })))
    );
    
    this.cotizacionesSub = cotizaciones$.subscribe(data => this.cotizaciones = data);
    this.contactosSub = contactos$.subscribe(data => this.contactos = data);
  }

  // --- Métodos para COTIZACIONES (CRUD) ---
  public async deleteCotizacion(cotizacionId: string) {
    if (confirm('¿Estás seguro de que quieres eliminar esta cotización?')) {
      try {
        await deleteDoc(doc(this.firestore, `cotizaciones/${cotizacionId}`));
        this.showSuccess('Cotización eliminada correctamente.');
      } catch (error) {
        this.showError('Error al eliminar la cotización.');
      }
    }
  }
  
  public editCotizacion(item: EditableDocument) {
    item.originalState = { ...item };
    item.isEditing = true;
  }
  
  public cancelEditCotizacion(item: EditableDocument) {
    if(item.originalState) Object.assign(item, item.originalState);
    item.isEditing = false;
  }
  
  public async saveCotizacion(item: EditableDocument) {
    const { isEditing, originalState, id, ...dataToSave } = item;
    if (!id) return this.showError("Error: El ID del documento no existe.");
    try {
        await updateDoc(doc(this.firestore, `cotizaciones/${id}`), dataToSave);
        item.isEditing = false;
        this.showSuccess('Cotización actualizada.');
    } catch(error) {
        this.showError('Error al actualizar la cotización.');
    }
  }

  // --- Métodos para CONTACTOS (CRUD) ---
  public async deleteContacto(contactoId: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
        try {
            await deleteDoc(doc(this.firestore, `contactos/${contactoId}`));
            this.showSuccess('Contacto eliminado correctamente.');
        } catch (error) {
            this.showError('Error al eliminar el contacto.');
        }
    }
  }

  public editContacto(item: EditableDocument) {
    item.originalState = { ...item };
    item.isEditing = true;
  }

  public cancelEditContacto(item: EditableDocument) {
    if(item.originalState) Object.assign(item, item.originalState);
    item.isEditing = false;
  }

  public async saveContacto(item: EditableDocument) {
    const { isEditing, originalState, id, ...dataToSave } = item;
    if (!id) return this.showError("Error: El ID del documento no existe.");
    try {
        await updateDoc(doc(this.firestore, `contactos/${id}`), dataToSave);
        item.isEditing = false;
        this.showSuccess('Contacto actualizado.');
    } catch(error) {
        this.showError('Error al actualizar el contacto.');
    }
  }

  // --- Métodos Utilitarios ---

  // Devuelve las claves ordenadas según el orden predefinido
  public getSortedKeys(obj: object, type: 'contactos' | 'cotizaciones'): string[] {
    const order = type === 'contactos' ? this.contactFieldOrder : this.quoteFieldOrder;
    const allKeys = Object.keys(obj).filter(key => key !== 'isEditing' && key !== 'originalState' && key !== 'id');

    return allKeys.sort((a, b) => {
        const indexA = order.indexOf(a);
        const indexB = order.indexOf(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
  }

  // Formatea el valor para mostrarlo. Especialmente útil para fechas.
  public formatFieldValue(value: any): string {
    // Si es un objeto Timestamp de Firestore, lo convertimos a Date y lo formateamos.
    if (value instanceof Timestamp) {
        return value.toDate().toLocaleString('es-ES', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    }
    // Si es un objeto, lo convertimos a JSON para verlo (ej: vehicleId)
    if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value);
    }
    // Para cualquier otro tipo, lo devolvemos como string.
    return String(value);
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Cerrar', { duration: 3000, verticalPosition: 'top' });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Cerrar', { duration: 4000, verticalPosition: 'top', panelClass: ['error-snackbar'] });
  }
 
}