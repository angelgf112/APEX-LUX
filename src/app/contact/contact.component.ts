import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactInfoComponent } from '../contact-info/contact-info.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,ContactInfoComponent,ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {}