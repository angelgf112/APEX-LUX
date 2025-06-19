import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
constructor(private firestore: Firestore) {}

  async saveContact(data: any) {
    const ref = collection(this.firestore, 'contactos'); // Nombre de la colección
    return await addDoc(ref, data);
  }
}
