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

// git
import {
  GithubAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private loggedUserName: string | null = null;
  private userType: 'admin' | 'usuario' | null = null;

  async loginWithPhoneNumber(
    phoneNumber: string,
    nombre?: string
  ): Promise<{
    success: boolean;
    confirmationResult?: ConfirmationResult;
    error?: string;
  }> {
    try {
      const appVerifier = new RecaptchaVerifier(
        this.auth, // ✅ primero va auth
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response: any) => {
            console.log('reCAPTCHA resuelto');
          },
        }
      );

      const confirmationResult = await signInWithPhoneNumber(
        this.auth,
        phoneNumber,
        appVerifier
      );

      return { success: true, confirmationResult };
    } catch (error: any) {
      console.error('Error al enviar SMS:', error);
      return { success: false, error: error.message };
    }
  }

  async verificarCodigoSMS(
    confirmationResult: ConfirmationResult,
    code: string,
    nombre?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await confirmationResult.confirm(code);
      const user = result.user;

      // Buscar si ya existe
      const userSnap = await getDoc(doc(this.firestore, 'usuarios', user.uid));

      if (!userSnap.exists()) {
        await setDoc(doc(this.firestore, 'usuarios', user.uid), {
          nombre: nombre || 'Usuario',
          telefono: user.phoneNumber,
          email: null,
          intentosFallidos: 0,
          bloqueado: false,
        });
      }

      this.loggedUserName = nombre || 'Usuario';
      this.userType = 'usuario';

      return { success: true };
    } catch (error: any) {
      console.error('Error al verificar el código:', error);
      return { success: false, error: error.message };
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; bloqueado: boolean; email?: string }> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email.trim(),
        password
      );
      const uid = userCredential.user.uid;

      // Buscar en usuarios
      let userDocRef = doc(this.firestore, 'usuarios', uid);
      let userSnap = await getDoc(userDocRef);

      // Si no está en usuarios, buscar en admins
      if (!userSnap.exists()) {
        userDocRef = doc(this.firestore, 'admins', uid);
        userSnap = await getDoc(userDocRef);
      }

      if (!userSnap.exists()) {
        return { success: false, bloqueado: false }; // No tiene perfil en Firestore
      }

      const userData = userSnap.data();
      if (userData['bloqueado']) {
        return { success: false, bloqueado: true, email };
      }

      // Login correcto
      await updateDoc(userDocRef, { intentosFallidos: 0, bloqueado: false });
      this.loggedUserName = userData['nombre'] || null;
      this.userType = userDocRef.path.includes('admins') ? 'admin' : 'usuario';

      return { success: true, bloqueado: false };
    } catch (error: any) {
      console.error('Error en login:', error);

      // En este punto no hay login, no hay uid
      // Buscar por email solo para contar intentos
      let userSnap = null;
      let userDocRef = null;

      const userQuery = query(
        collection(this.firestore, 'usuarios'),
        where('email', '==', email)
      );
      const userSnapQuery = await getDocs(userQuery);

      if (!userSnapQuery.empty) {
        userSnap = userSnapQuery.docs[0];
        userDocRef = userSnap.ref;
      } else {
        const adminQuery = query(
          collection(this.firestore, 'admins'),
          where('email', '==', email)
        );
        const adminSnapQuery = await getDocs(adminQuery);
        if (!adminSnapQuery.empty) {
          userSnap = adminSnapQuery.docs[0];
          userDocRef = userSnap.ref;
        }
      }

      if (userSnap && userDocRef) {
        const intentosActuales = userSnap.data()['intentosFallidos'] || 0;
        const nuevosIntentos = intentosActuales + 1;
        const bloqueado = nuevosIntentos >= 3;

        await updateDoc(userDocRef, {
          intentosFallidos: nuevosIntentos,
          bloqueado: bloqueado,
        });

        return { success: false, bloqueado, email };
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

  // git
  async loginWithGitHub(): Promise<{ success: boolean; email?: string }> {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(this.auth, provider);

      const user = result.user;
      const email = user.email ?? user.providerData[0]?.email;

      if (!email) {
        throw new Error('Email no disponible');
      }

      // Buscar si ya existe en la colección de usuarios
      const usersQuery = query(
        collection(this.firestore, 'usuarios'),
        where('email', '==', email)
      );
      const usersSnap = await getDocs(usersQuery);

      if (usersSnap.empty) {
        await setDoc(doc(this.firestore, 'usuarios', user.uid), {
          nombre: user.displayName || 'Usuario GitHub',
          email,
          intentosFallidos: 0,
          bloqueado: false,
        });
      }

      this.loggedUserName = user.displayName || email;
      this.userType = 'usuario';

      return { success: true, email };
    } catch (error) {
      console.error('Error en login con GitHub:', error);
      return { success: false };
    }
  }
}
