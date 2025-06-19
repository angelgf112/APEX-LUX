import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ContactService } from '../services/contact.service';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent {
  subjects = [
    'Información sobre vehículos',
    '  Cotización',
    'Servicio postventa',
    'Financiamiento',
    'Otra consulta',
  ];

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService, private snackBar: MatSnackBar) {
  this.contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    date: ['', [Validators.required, this.validateDate]],
    contactMethod: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });
}


  // Valida que la fecha no sea anterior a hoy
  validateDate(control: any) {
    const today = new Date();
    const selectedDate = new Date(control.value);
    return selectedDate < today ? { invalidDate: true } : null;
  }

  // Se ejecuta al enviar el formulario
 async onSubmit() {
  if (this.contactForm.valid) {
    try {
      await this.contactService.saveContact(this.contactForm.value);
      this.snackBar.open('Formulario enviado con éxito', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
      });
      this.contactForm.reset(); // Limpia formulario
    } catch (error) {
      console.error('Error al guardar', error);
      this.snackBar.open('Ocurrió un error al enviar el formulario', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
  }
}

}
