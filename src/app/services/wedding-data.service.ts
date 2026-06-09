import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface GuestRegistration {
  id: string;
  fullName: string;
  dietaryNotes: string;
  attendance: 'si' | 'no';
  icon: string;
  color: string;
  createdAt: string;
}

export interface MusicSuggestion {
  id: string;
  title: string;
  artist: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeddingDataService {
  private readonly basePath = '/api';
  private readonly localRegistrationsKey = 'matrimonio.confirmaciones';
  private readonly localSongsKey = 'matrimonio.canciones';

  constructor(private readonly http: HttpClient) {}

  getRegistrations(): Observable<GuestRegistration[]> {
    return this.http.get<GuestRegistration[]>(`${this.basePath}/confirmaciones`).pipe(
      tap(registrations => this.writeLocal(this.localRegistrationsKey, registrations)),
      catchError(() => of(this.readLocal<GuestRegistration>(this.localRegistrationsKey)))
    );
  }

  addRegistration(registration: GuestRegistration): Observable<GuestRegistration> {
    return this.http.post<GuestRegistration>(`${this.basePath}/confirmaciones`, registration).pipe(
      tap(saved => {
        const items = this.readLocal<GuestRegistration>(this.localRegistrationsKey)
          .filter(item => item.id !== saved.id);
        items.unshift(saved);
        this.writeLocal(this.localRegistrationsKey, items);
      }),
      catchError(() => {
        const items = this.readLocal<GuestRegistration>(this.localRegistrationsKey)
          .filter(item => item.id !== registration.id);
        items.unshift(registration);
        this.writeLocal(this.localRegistrationsKey, items);
        return of(registration);
      })
    );
  }

  deleteRegistration(id: string): Observable<{ ok: true }> {
    return this.http.delete<{ ok: true }>(`${this.basePath}/confirmaciones?id=${encodeURIComponent(id)}`).pipe(
      tap(() => {
        const items = this.readLocal<GuestRegistration>(this.localRegistrationsKey)
          .filter(item => item.id !== id);
        this.writeLocal(this.localRegistrationsKey, items);
      }),
      catchError(() => {
        const items = this.readLocal<GuestRegistration>(this.localRegistrationsKey)
          .filter(item => item.id !== id);
        this.writeLocal(this.localRegistrationsKey, items);
        return of({ ok: true as const });
      })
    );
  }

  getMusicSuggestions(): Observable<MusicSuggestion[]> {
    return this.http.get<MusicSuggestion[]>(`${this.basePath}/canciones`).pipe(
      tap(suggestions => this.writeLocal(this.localSongsKey, suggestions)),
      catchError(() => of(this.readLocal<MusicSuggestion>(this.localSongsKey)))
    );
  }

  addMusicSuggestion(suggestion: MusicSuggestion): Observable<MusicSuggestion> {
    return this.http.post<MusicSuggestion>(`${this.basePath}/canciones`, suggestion).pipe(
      tap(saved => {
        const items = this.readLocal<MusicSuggestion>(this.localSongsKey)
          .filter(item => item.id !== saved.id);
        items.unshift(saved);
        this.writeLocal(this.localSongsKey, items);
      }),
      catchError(() => {
        const items = this.readLocal<MusicSuggestion>(this.localSongsKey)
          .filter(item => item.id !== suggestion.id);
        items.unshift(suggestion);
        this.writeLocal(this.localSongsKey, items);
        return of(suggestion);
      })
    );
  }

  deleteMusicSuggestion(id: string): Observable<{ ok: true }> {
    return this.http.delete<{ ok: true }>(`${this.basePath}/canciones?id=${encodeURIComponent(id)}`).pipe(
      tap(() => {
        const items = this.readLocal<MusicSuggestion>(this.localSongsKey)
          .filter(item => item.id !== id);
        this.writeLocal(this.localSongsKey, items);
      }),
      catchError(() => {
        const items = this.readLocal<MusicSuggestion>(this.localSongsKey)
          .filter(item => item.id !== id);
        this.writeLocal(this.localSongsKey, items);
        return of({ ok: true as const });
      })
    );
  }

  private readLocal<T>(key: string): T[] {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw) as unknown;
      return Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch {
      return [];
    }
  }

  private writeLocal<T>(key: string, value: T[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
