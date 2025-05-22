import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'exam_auth_token';
  private readonly USER_ROLE = 'exam_user_role'; // optional: 'admin' or 'student'

  constructor(private router: Router) {}

  login(token: string, role: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_ROLE, role);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_ROLE);
    this.router.navigate(['/account/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  isAdmin(): boolean {
    return localStorage.getItem(this.USER_ROLE) === 'admin';
  }

  getRole(): string | null {
    return localStorage.getItem(this.USER_ROLE);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
