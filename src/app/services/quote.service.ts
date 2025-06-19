import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class QuoteService {
constructor(private firestore: Firestore) {}

  async saveQuote(data: any) {
    const ref = collection(this.firestore, 'cotizaciones'); // Nombre de la colección
    return await addDoc(ref, data);
  }
}
