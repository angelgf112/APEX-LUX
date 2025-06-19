import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-contact-info',
    standalone: true,
    imports: [MatIconModule, CommonModule],
    templateUrl: './contact-info.component.html',
    styleUrls: ['./contact-info.component.css'],
})
export class ContactInfoComponent {}
