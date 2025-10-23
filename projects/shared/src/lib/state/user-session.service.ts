import { Injectable, signal, effect } from '@angular/core';
import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class UserSessionService {
  user = signal<User | null>(null);
  isLoggedIn = signal<number>(0);
  isLoggedOut = signal<number>(0);

  constructor() {
    const stored = localStorage.getItem('poc_mfe_user');
    if (stored) this.user.set(JSON.parse(stored));

    effect(() => {
      const u = this.user();
      if (u) localStorage.setItem('poc_mfe_user', JSON.stringify(u));
      else localStorage.removeItem('poc_mfe_user');
    });
  }

  saveSession(user: User) {
    this.user.set(user);
    this.isLoggedIn.update(n => n + 1);
  }

  logout() {
    this.user.set(null);
    this.isLoggedOut.update(n => n + 1);
  }
}
