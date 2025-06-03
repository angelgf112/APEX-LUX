import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  setDoc,
} from '@angular/fire/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private loggedUserName: string | null = null;
  private userType: 'admin' | 'usuario' | null = null;

  async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; bloqueado: boolean; email?: string }> {
    let userDocRef = null;
    let userSnap = null;

    try {
      // Buscar en admins
      const adminsQuery = query(
        collection(this.firestore, 'admins'),
        where('email', '==', email)
      );
      const adminsSnap = await getDocs(adminsQuery);
      if (!adminsSnap.empty) {
        userSnap = adminsSnap.docs[0];
        userDocRef = userSnap.ref;
      } else {
        // Buscar en usuarios
        const usersQuery = query(
          collection(this.firestore, 'usuarios'),
          where('email', '==', email)
        );
        const usersSnap = await getDocs(usersQuery);
        if (!usersSnap.empty) {
          userSnap = usersSnap.docs[0];
          userDocRef = userSnap.ref;
        }
      }

      if (!userSnap || !userDocRef) {
        return { success: false, bloqueado: false };
      }

      // Revisar bloqueo con notacion ['bloqueado']
      const estaBloqueado = userSnap.data()['bloqueado'] === true;
      if (estaBloqueado) {
        return { success: false, bloqueado: true, email };
      }

      // Intentar login
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      // Login correcto: resetear intentos y desbloquear
      await updateDoc(userDocRef, { intentosFallidos: 0, bloqueado: false });

      // Asignar datos para otras propiedades (ejemplo)
      this.loggedUserName = userSnap.data()['nombre'] || null;

      return { success: true, bloqueado: false };
    } catch (error) {
      // En catch, revisar que userDocRef no sea null antes de updateDoc
      if (userDocRef) {
        const intentosActuales = userSnap?.data()['intentosFallidos'] || 0;
        const nuevosIntentos = intentosActuales + 1;
        const bloqueado = nuevosIntentos >= 3;

        await updateDoc(userDocRef, {
          intentosFallidos: nuevosIntentos,
          bloqueado: bloqueado,
        });

        return { success: false, bloqueado: bloqueado, email };
      }

      return { success: false, bloqueado: false };
    }
  }

  async resetearBloqueoYEnviarCorreo(email: string): Promise<boolean> {
    try {
      // Enviar correo de recuperación
      await sendPasswordResetEmail(this.auth, email);

      // Buscar en usuarios y admins por email
      const userQuery = query(
        collection(this.firestore, 'usuarios'),
        where('email', '==', email)
      );
      const adminQuery = query(
        collection(this.firestore, 'admins'),
        where('email', '==', email)
      );

      const userSnap = await getDocs(userQuery);
      let docRef = null;

      if (!userSnap.empty) {
        const uid = userSnap.docs[0].id;
        docRef = doc(this.firestore, 'usuarios', uid);
      } else {
        const adminSnap = await getDocs(adminQuery);
        if (!adminSnap.empty) {
          const uid = adminSnap.docs[0].id;
          docRef = doc(this.firestore, 'admins', uid);
        }
      }

      // Si se encontró el doc, resetear bloqueo e intentos fallidos
      if (docRef) {
        await updateDoc(docRef, {
          intentosFallidos: 0,
          bloqueado: false,
        });
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  async register(
    nombre: string,
    email: string,
    password: string
  ): Promise<boolean> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      await setDoc(doc(this.firestore, 'usuarios', uid), {
        nombre: nombre,
        email: email,
        intentosFallidos: 0,
        bloqueado: false,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  logout() {
    this.loggedUserName = null;
    this.userType = null;
    this.auth.signOut();
  }

  isAdmin(): boolean {
    return this.userType === 'admin';
  }

  get userName() {
    return this.loggedUserName;
  }

  isLoggedIn(): boolean {
    return this.loggedUserName !== null; // ksjks
  }
}
