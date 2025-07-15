import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginCredentials, RegisterData } from '../../core/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoginMode = true;
  isLoading = false;
  showLoadingModal = false; // Para mostrar el modal de loading

  // Login form
  loginCredentials: { email: string; password: string } = {
    email: '',
    password: ''
  };

  // Register form
  registerData: RegisterData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  showPasswordLogin = false;
  showPasswordRegister = false;
  showPasswordRegisterConfirm = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.resetForms();
  }

  resetForms() {
    this.loginCredentials = { email: '', password: '' };
    this.registerData = { username: '', email: '', password: '', confirmPassword: '' };
  }

  onLogin() {
    if (!this.loginCredentials.email || !this.loginCredentials.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor, completa todos los campos.',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      // Cambiar login a usar email
      const user = this.authService.getUserByEmailAndPassword(
        this.loginCredentials.email,
        this.loginCredentials.password
      );
      if (user) {
        this.authService.setCurrentUser(user);
        this.showLoadingModal = true;
        setTimeout(() => {
          this.showLoadingModal = false;
          this.router.navigate(['/chatbot']);
        }, 3000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Email o contraseña incorrectos.',
          confirmButtonColor: '#ef4444'
        });
      }
      this.isLoading = false;
    }, 1000);
  }

  onRegister() {
    if (!this.registerData.username || !this.registerData.email || 
        !this.registerData.password || !this.registerData.confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor, completa todos los campos.',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'Las contraseñas deben ser iguales.',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    if (this.registerData.password.length < 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Contraseña muy corta',
        text: 'La contraseña debe tener al menos 6 caracteres.',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      if (this.authService.register(this.registerData)) {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.',
          confirmButtonColor: '#10b981'
        }).then(() => {
          this.isLoginMode = true;
          this.resetForms();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: 'El usuario o email ya existe.',
          confirmButtonColor: '#ef4444'
        });
      }
      this.isLoading = false;
    }, 1000);
  }

  showDemoCredentials() {
    Swal.fire({
      title: 'Credenciales de demostración',
      html: `
        <div class="text-left">
          <p class="mb-2"><strong>Usuario 1:</strong></p>
          <p class="mb-1">Email: <code>admin@example.com</code></p>
          <p class="mb-3">Contraseña: <code>admin123</code></p>
          
          <p class="mb-2"><strong>Usuario 2:</strong></p>
          <p class="mb-1">Email: <code>user@example.com</code></p>
          <p class="mb-0">Contraseña: <code>user123</code></p>
        </div>
      `,
      icon: 'info',
      confirmButtonColor: '#3b82f6'
    });
  }
}
