import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaqComponent } from '../faq/faq.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface Service {
  title: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FaqComponent,
    HttpClientModule,
  ],
  templateUrl: './servicess.component.html',
  styleUrls: ['./servicess.component.css'],
})
export class ServicesComponent implements OnInit {
  allServices: Service[] = []; // Todos los servicios cargados
  filteredServices: Service[] = []; // Servicios filtrados por búsqueda
  isLoading: boolean = true;
  errorMessage: string = '';
  searchTerm: string = '';

  defaultServices: Service[] = [
    {
      title: 'Mantenimiento Preventivo',
      icon: 'build',
      description: 'Servicio de mantenimiento regular para evitar fallas.',
    },
    {
      title: 'Diagnóstico Electrónico',
      icon: 'settings_input_component',
      description: 'Uso de tecnología avanzada para identificar problemas.',
    },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchServices();
  }

  fetchServices(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http
      .get<Service[]>('https://miniproyecto.free.beeceptor.com')
      .subscribe({
        next: (data) => {
          this.allServices = data;
          this.filteredServices = [...this.allServices]; // Inicialmente muestra todos
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error al obtener servicios:', err);
          this.allServices = this.defaultServices;
          this.filteredServices = [...this.allServices];
          this.errorMessage =
            'Usando datos de ejemplo (fallo al conectar con la API)';
          this.isLoading = false;
        },
      });
  }

  filterServices(): void {
    if (!this.searchTerm) {
      this.filteredServices = [...this.allServices];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredServices = this.allServices.filter((service) => {
      const titleMatch = service.title?.toLowerCase().includes(term) || false;
      const descMatch =
        service.description?.toLowerCase().includes(term) || false;
      return titleMatch || descMatch;
    });
  }
}
