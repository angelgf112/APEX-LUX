import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { Vehicle } from '../vehicle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css']
})
export class QuoteFormComponent {
  @Input() vehicle!: Vehicle;
  @Output() quoteSubmitted = new EventEmitter<void>();

  quoteData = {
    fullName: '',
    email: '',
    financingType: '',
    promotions: '',
    contactDate: ''
  };

  financingOptions = ['Crédito', 'Contado', 'Leasing'];
  today = new Date();

  submitQuote(form: NgForm) {
    if (form.valid) {
      console.log('Quote Submitted:', this.quoteData);
      this.quoteSubmitted.emit();
      form.resetForm();
    }
  }
}
