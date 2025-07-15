import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatarUrl?: string; // base64 o url
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.loadCurrentUser();
    }
  }

  private loadCurrentUser(): void {
    if (!this.isBrowser) return;
    
    try {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUserSubject.next(JSON.parse(user));
      }
    } catch (error) {
      console.error('Error loading current user:', error);
    }
  }

  private saveCurrentUser(user: User): void {
    if (!this.isBrowser) return;
    
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    } catch (error) {
      console.error('Error saving current user:', error);
    }
  }

  private getUsers(): User[] {
    if (!this.isBrowser) return [];
    
    try {
      const users = localStorage.getItem('users');
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }

  private saveUsers(users: User[]): void {
    if (!this.isBrowser) return;
    
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }

  private initializeDefaultUsers(): void {
    if (!this.isBrowser) return;
    
    const users = this.getUsers();
    if (users.length === 0) {
      const defaultUsers: User[] = [
        {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          password: 'admin123'
        },
        {
          id: '2',
          username: 'user',
          email: 'user@example.com',
          password: 'user123'
        }
      ];
      this.saveUsers(defaultUsers);
    }
  }

  register(userData: RegisterData): boolean {
    if (!this.isBrowser) return false;
    
    this.initializeDefaultUsers();
    const users = this.getUsers();

    // Verificar si el usuario ya existe
    const existingUser = users.find(u => u.username === userData.username || u.email === userData.email);
    if (existingUser) {
      return false;
    }

    // Verificar que las contraseñas coincidan
    if (userData.password !== userData.confirmPassword) {
      return false;
    }

    // Crear nuevo usuario
    const newUser: User = {
      id: crypto.randomUUID(),
      username: userData.username,
      email: userData.email,
      password: userData.password
    };

    users.push(newUser);
    this.saveUsers(users);
    return true;
  }

  login(credentials: LoginCredentials): boolean {
    if (!this.isBrowser) return false;
    
    this.initializeDefaultUsers();
    const users = this.getUsers();
    
    const user = users.find(u => 
      u.username === credentials.username && 
      u.password === credentials.password
    );

    if (user) {
      this.saveCurrentUser(user);
      return true;
    }
    return false;
  }

  logout(): void {
    if (!this.isBrowser) return;
    
    try {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  isAuthenticated(): boolean {
    // Primero verificar el BehaviorSubject
    if (this.currentUserSubject.value !== null) {
      return true;
    }
    
    // Si no hay usuario en el BehaviorSubject, verificar localStorage
    if (this.isBrowser) {
      try {
        const user = localStorage.getItem('currentUser');
        if (user) {
          const parsedUser = JSON.parse(user);
          this.currentUserSubject.next(parsedUser);
          return true;
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    }
    
    return false;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getUserByEmailAndPassword(email: string, password: string): User | null {
    if (!this.isBrowser) return null;
    const users = this.getUsers();
    return users.find(u => u.email === email && u.password === password) || null;
  }

  // Método público para guardar el usuario actual (para login por email)
  setCurrentUser(user: User): void {
    this.saveCurrentUser(user);
  }

  updateProfile(data: { username?: string; email?: string; avatarUrl?: string }): void {
    if (!this.isBrowser) return;
    const user = this.getCurrentUser();
    if (!user) return;
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return;
    if (data.username) users[idx].username = data.username;
    if (data.email) users[idx].email = data.email;
    if (data.avatarUrl) users[idx].avatarUrl = data.avatarUrl;
    this.saveUsers(users);
    this.saveCurrentUser(users[idx]);
  }
} 