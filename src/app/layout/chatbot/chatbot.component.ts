import { Component, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Chat } from '../../core/interface/chat';
import { ChatViewComponent } from "../chat-view/chat-view.component";
import { HttpClientModule } from '@angular/common/http';
import { ChatbotService } from '../../core/service/chatbot.service';
import { AuthService } from '../../core/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatViewComponent, RouterModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  showUserMenu = false;
  showSidebar = false; // Para controlar el sidebar en móvil
  showProfileModal = false; // Para controlar el modal de perfil
  chats: Chat[] = [];
  promptText: string = '';
  lastPrompt: string = '';
  chatActivoId: string | null = null;
  isBrowser: boolean;
  currentUser: any = null;
  
  // Propiedades para el formulario de perfil
  profileForm = {
    username: '',
    email: '',
    avatarUrl: ''
  };
  isEditing = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

constructor(
  @Inject(PLATFORM_ID) private platformId: Object,
  private chatbotService: ChatbotService,
  private authService: AuthService,
  private router: Router,
  private cdr: ChangeDetectorRef
) {
  this.isBrowser = isPlatformBrowser(this.platformId);
}

  ngOnInit() {
    if (this.isBrowser) {
      this.loadChats();
      this.currentUser = this.authService.getCurrentUser();
      
      // Si no hay usuario autenticado, redirigir al login
      if (!this.currentUser) {
        this.router.navigate(['/login']);
        return;
      }
      
      // Agregar listener para cambios de tamaño de ventana
      window.addEventListener('resize', this.onWindowResize.bind(this));
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      window.removeEventListener('resize', this.onWindowResize.bind(this));
    }
  }

  onWindowResize() {
    // Cerrar sidebar automáticamente cuando la pantalla se hace más grande
    if (window.innerWidth >= 1024 && this.showSidebar) {
      this.closeSidebar();
    }
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  closeSidebar() {
    this.showSidebar = false;
  }

  logout() {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que quieres cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#1458e1',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire({
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión correctamente.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }

  getCurrentUserInitials(): string {
    if (this.currentUser && this.currentUser.username) {
      return this.currentUser.username.substring(0, 2).toUpperCase();
    }
    return 'U';
  }

  getUserAvatar(): string | null {
    return this.currentUser?.avatarUrl || null;
  }

  getCurrentUserName(): string {
    return this.currentUser ? this.currentUser.username : 'Usuario';
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  // Métodos para el modal de perfil
  openProfileModal() {
    console.log('Abriendo modal de perfil...');
    this.showProfileModal = true;
    this.showUserMenu = false;
    this.loadProfileData();
    this.cdr.detectChanges();
    console.log('showProfileModal:', this.showProfileModal);
  }

  // Método de prueba simple
  testModal() {
    console.log('Test modal clicked');
    this.showProfileModal = !this.showProfileModal;
    console.log('showProfileModal:', this.showProfileModal);
    this.cdr.detectChanges();
  }

  closeProfileModal() {
    this.showProfileModal = false;
    this.isEditing = false;
    this.selectedFile = null;
    this.previewUrl = null;
    this.resetProfileForm();
  }

  loadProfileData() {
    if (this.currentUser) {
      this.profileForm = {
        username: this.currentUser.username || '',
        email: this.currentUser.email || '',
        avatarUrl: this.currentUser.avatarUrl || ''
      };
      this.previewUrl = this.currentUser.avatarUrl || null;
    }
  }

  resetProfileForm() {
    this.profileForm = {
      username: '',
      email: '',
      avatarUrl: ''
    };
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.loadProfileData();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          title: 'Error',
          text: 'Por favor selecciona un archivo de imagen válido.',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'Error',
          text: 'La imagen debe ser menor a 5MB.',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
        return;
      }

      this.selectedFile = file;
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    if (!this.currentUser) return;

    // Validar campos requeridos
    if (!this.profileForm.username.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'El nombre de usuario es requerido.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    if (!this.profileForm.email.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'El email es requerido.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.profileForm.email)) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor ingresa un email válido.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    // Actualizar datos del usuario
    const updateData: any = {
      username: this.profileForm.username.trim(),
      email: this.profileForm.email.trim()
    };

    // Si hay una nueva imagen, convertirla a base64
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        updateData.avatarUrl = e.target.result;
        this.finalizeProfileUpdate(updateData);
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.finalizeProfileUpdate(updateData);
    }
  }

  private finalizeProfileUpdate(updateData: any) {
    // Actualizar en el servicio de autenticación
    this.authService.updateProfile(updateData);
    
    // Actualizar el usuario actual en el componente
    this.currentUser = this.authService.getCurrentUser();

    // Mostrar mensaje de éxito
    Swal.fire({
      title: '¡Perfil actualizado!',
      text: 'Tus datos han sido guardados correctamente.',
      icon: 'success',
      confirmButtonColor: '#1458e1',
      timer: 2000,
      showConfirmButton: false
    });

    this.isEditing = false;
    this.selectedFile = null;
  }

  cancelEdit() {
    this.isEditing = false;
    this.selectedFile = null;
    this.previewUrl = this.currentUser?.avatarUrl || null;
    this.loadProfileData();
  }

  triggerFileInput() {
    const fileInput = document.getElementById('avatarInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  loadChats() {
    if (this.isBrowser) {
      const saved = localStorage.getItem('chats');
      this.chats = saved ? JSON.parse(saved) : [];
    }
  }

  saveChats() {
    if (this.isBrowser) {
      localStorage.setItem('chats', JSON.stringify(this.chats));
    }
  }

  createChat() {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: 'Nuevo Chat',
      messages: []
    };
    this.chats.unshift(newChat);
    this.chatActivoId = newChat.id;
    this.saveChats();
  }

  deleteChat(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el chat permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#1458e1',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.chats = this.chats.filter(chat => chat.id !== id);
        if (this.chatActivoId === id) {
          this.chatActivoId = null;
        }
        this.saveChats();
      }
    });
  }

  selectChat(chatId: string) {
    this.chatActivoId = chatId;
    const chat = this.chats.find(c => c.id === chatId);
    this.lastPrompt = chat?.messages[chat.messages.length - 1] ?? '';
    
    // Cerrar el sidebar en móvil cuando se selecciona un chat
    if (window.innerWidth < 1024) {
      this.closeSidebar();
    }
  }

  sendPrompt() {
    if (!this.promptText.trim()) return;

    const prompt = this.promptText.trim();

    this.chatbotService.askQuestion(prompt).subscribe({
      next: (response) => {
        const message = `Yo: ${prompt}\nIA: ${response}`;

        if (!this.chatActivoId) {
          const newChat: Chat = {
            id: crypto.randomUUID(),
            title: prompt.substring(0, 30) + '...',
            messages: [message]
          };
          this.chats.unshift(newChat);
          this.chatActivoId = newChat.id;
        } else {
          const chat = this.chats.find(c => c.id === this.chatActivoId);
          if (chat) {
            chat.messages.push(message);
            if (chat.messages.length === 1) {
              chat.title = prompt.substring(0, 30) + '...';
            }
          }
        }

        this.saveChats();
        this.lastPrompt = message;
        this.promptText = '';
      },
      error: (err) => {
        console.error('Error al enviar pregunta:', err);
        // opcional: mostrar mensaje de error al usuario
      }
    });
  }
}
