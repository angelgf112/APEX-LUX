import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-faq',
  imports: [MatExpansionModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  // Definimos cada pregunta frecuente por separado
  faq1 = {
    question: '¿Cómo puedo obtener financiamiento?',
    answer: 'Ofrecemos diversas opciones de financiamiento a través de bancos y entidades financieras.',
  };

  faq2 = {
    question: '¿Tienen garantía para los vehículos?',
    answer: 'Sí, ofrecemos una garantía de 1 año para todos los vehículos vendidos.',
  };

  faq3 = {
    question: '¿Qué servicios de mantenimiento incluyen?',
    answer: 'Ofrecemos cambios de aceite, revisión de frenos, alineación y balanceo, entre otros.',
  };
}
