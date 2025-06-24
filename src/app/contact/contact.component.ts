import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactInfoComponent } from '../contact-info/contact-info.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { AuthService } from '../shared/auth.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,ContactInfoComponent,ContactFormComponent,MatCardModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(public authService: AuthService){
  }
}