import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

// sms
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  Auth,
} from 'firebase/auth';

@Component({
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {
  // Modo para alternar entre login y registro
  isRegisterMode = false;

  // Login
  email: string = '';
  password: string = '';
  error: boolean = false;

  // Registro
  name: string = '';
  regEmail: string = '';
  regPassword: string = '';
  confirmPassword: string = '';
  regError: string = '';

  // Bloqueo
  mostrarBotonDesbloqueo: boolean = false;
  emailBloqueado: string = '';
  mensajeExito: string = '';

  // captcha
  @ViewChild('captchaContainer', { static: false })
  captchaContainer!: ElementRef;

  siteKey = '6LedNU8rAAAAANFUKGrLE-cInCYDwy8jWrCgGVzX'; // tu clave pública
  recaptchaResponse: string | null = null;
  errorCaptcha: string | null = null;
  captchaWidgetId: any;

  // sms
  @ViewChild('firebaseRecaptcha', { static: false })
  firebaseRecaptcha!: ElementRef;

  recaptchaVerifier!: RecaptchaVerifier;
  auth: Auth = getAuth();

  phoneNumber: string = '';
  verificationCode: string = '';
  confirmationResult: any = null;
  telefono: string = '';
  nombre: string = '';
  codigo: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private snackBar: MatSnackBar
  ) {
    (window as any).captchaCallback = (response: string) => {
      this.ngZone.run(() => {
        this.recaptchaResponse = response;
        this.errorCaptcha = null;
      });
    };
  }

  private renderCaptcha() {
    if ((window as any).grecaptcha && this.captchaContainer?.nativeElement) {
      this.captchaWidgetId = (window as any).grecaptcha.render(
        this.captchaContainer.nativeElement,
        {
          sitekey: this.siteKey,
          callback: (response: string) => {
            this.ngZone.run(() => {
              this.recaptchaResponse = response;
              this.errorCaptcha = null;
            });
          },
        }
      );
    }
  }

  ngAfterViewInit() {
    this.renderCaptcha();
    this.inicializarRecaptchaFirebase();
  }

  // Inicializar reCAPTCHA invisible para Firebase SMS
  inicializarRecaptchaFirebase() {
    if (!this.recaptchaVerifier && this.firebaseRecaptcha) {
      this.recaptchaVerifier = new RecaptchaVerifier(
        this.auth,
        this.firebaseRecaptcha.nativeElement as HTMLElement,
        {
          size: 'invisible',
          callback: (response: any) => {
            console.log('Captcha resuelto para SMS');
          },
        }
      );
      this.recaptchaVerifier.render();
    }
  }

  // Enviar SMS con código de verificación
  async enviarCodigoSms() {
    const numero = this.telefono; // debe ir con +52 (si es México)
    const nombre = this.nombre;

    const res = await this.authService.loginWithPhoneNumber(numero, nombre);
    if (res.success && res.confirmationResult) {
      this.confirmationResult = res.confirmationResult;
      this.snackBar.open('SMS enviado. Ingresa el código', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
      });
    } else {
      this.snackBar.open('Error al enviar SMS', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
  }

  // Verificar código SMS y hacer login
  async verificarCodigoSms() {
    if (!this.confirmationResult) return;

    const res = await this.authService.verificarCodigoSMS(
      this.confirmationResult,
      this.codigo,
      this.nombre
    );
    if (res.success) {
      this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
      });
      this.phoneNumber = '';
      this.verificationCode = '';
      this.confirmationResult = null;
      this.telefono = '';
      this.nombre = '';
      this.codigo = '';

      this.router.navigate(['/']);
    } else {
      this.snackBar.open('Código incorrecto', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
  }

  async login() {
    this.error = false;
    this.errorCaptcha = null;

    if (!this.recaptchaResponse) {
      this.errorCaptcha = 'Por favor completa el captcha antes de ingresar.';
      return;
    }

    const resultado = await this.authService.login(this.email, this.password);

    if (resultado.success) {
      this.error = false;
      this.mostrarBotonDesbloqueo = false;
      this.emailBloqueado = '';
      this.router.navigate(['/']);
    } else {
      if (resultado.bloqueado) {
        this.error = false;
        this.mostrarBotonDesbloqueo = true;
        this.emailBloqueado = resultado.email || '';
      } else {
        this.error = true;
        this.mostrarBotonDesbloqueo = false;
        this.emailBloqueado = '';
      }
    }
  }

  async resetPassword() {
    try {
      if (this.emailBloqueado) {
        await this.authService.resetearBloqueoYEnviarCorreo(
          this.emailBloqueado
        );
        this.mensajeExito = 'Correo para restablecer contraseña enviado.';
      }
    } catch {
      this.mensajeExito = 'Error al enviar correo.';
    }
  }

  // Validar contraseña para registro
  private validatePassword(password: string): string | null {
    if (password.length < 8 || password.length > 16)
      return 'La contraseña debe tener entre 8 y 16 caracteres.';
    if (!/^[A-Za-z0-9_]+$/.test(password))
      return 'La contraseña solo puede contener letras, dígitos y guion bajo (_).';
    if (!/[A-Z]/.test(password))
      return 'La contraseña debe contener al menos una letra mayúscula.';
    if (!/\d/.test(password))
      return 'La contraseña debe contener al menos un dígito.';
    return null;
  }

  async register() {
    this.regError = '';

    // Validar campos
    if (
      !this.name ||
      !this.regEmail ||
      !this.regPassword ||
      !this.confirmPassword
    ) {
      this.regError = 'Por favor, complete todos los campos.';
      return;
    }

    // Validar contraseña
    const pwdError = this.validatePassword(this.regPassword);
    if (pwdError) {
      this.regError = pwdError;
      return;
    }

    // Confirmar contraseña
    if (this.regPassword !== this.confirmPassword) {
      this.regError = 'Las contraseñas no coinciden.';
      return;
    }

    // Registrar con el servicio
    try {
      await this.authService.register(
        this.name,
        this.regEmail,
        this.regPassword
      );
      //alert('Usuario registrado con éxito.');
      this.snackBar.open('Usuario registrado con éxito', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
      });
      // Reset campos y volver a login
      this.name = '';
      this.regEmail = '';
      this.regPassword = '';
      this.confirmPassword = '';
      this.isRegisterMode = false;
      this.renderCaptcha();
    } catch (err) {
      this.regError = 'Error al registrar el usuario. Intente de nuevo.';
    }
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.error = false;
    this.regError = '';
  }

  // git
  async loginConGitHub() {
    const res = await this.authService.loginWithGitHub();
    if (res.success) {
      this.router.navigate(['/']);
    } else {
      this.error = true;
    }
  }
}
