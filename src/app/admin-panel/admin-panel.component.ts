import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {
  cotizaciones: any[] = [];
  contactos: any[] = [];

  constructor() {
    this.loadData();
  }

  loadData() {
    const cotizacionesData = JSON.parse(localStorage.getItem('quotes') || '[]');
    const contactosData = JSON.parse(localStorage.getItem('contacts') || '[]');

    // Agregamos propiedad isEditing a cada elemento
    this.cotizaciones = cotizacionesData.map((cot: any) => ({
      ...cot,
      isEditing: false,
    }));

    this.contactos = contactosData.map((cont: any) => ({
      ...cont,
      isEditing: false,
    }));
  }

  saveCotizaciones() {
    const cotizacionesToSave = this.cotizaciones.map(
      ({ isEditing, ...rest }) => rest
    );
    localStorage.setItem('quotes', JSON.stringify(cotizacionesToSave));
  }

  saveContactos() {
    const contactosToSave = this.contactos.map(
      ({ isEditing, ...rest }) => rest
    );
    localStorage.setItem('contacts', JSON.stringify(contactosToSave));
  }

  deleteCotizacion(index: number) {
    this.cotizaciones.splice(index, 1);
    this.saveCotizaciones();
    this.loadData();
  }

  deleteContacto(index: number) {
    this.contactos.splice(index, 1);
    this.saveContactos();
    this.loadData();
  }

  editCotizacion(index: number) {
    this.cotizaciones[index].isEditing = true;
  }

  saveCotizacion(index: number) {
    this.cotizaciones[index].isEditing = false;
    this.saveCotizaciones();
    this.loadData();
  }

  cancelEditCotizacion(index: number) {
    this.loadData();
  }

  editContacto(index: number) {
    this.contactos[index].isEditing = true;
  }

  saveContacto(index: number) {
    this.contactos[index].isEditing = false;
    this.saveContactos();
    this.loadData();
  }

  cancelEditContacto(index: number) {
    this.loadData();
  }

  cotizacionKeys(obj: any) {
    return Object.keys(obj);
  }
}
