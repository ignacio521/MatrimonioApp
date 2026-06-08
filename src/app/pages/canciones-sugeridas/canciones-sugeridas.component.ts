import { Component, OnInit } from '@angular/core';

interface MusicSuggestion {
  id: string;
  title: string;
  artist: string;
  createdAt: string;
}

@Component({
  selector: 'app-canciones-sugeridas',
  templateUrl: './canciones-sugeridas.component.html',
  styleUrls: ['./canciones-sugeridas.component.css']
})
export class CancionesSugeridasComponent implements OnInit {
  private readonly musicStorageKey = 'matrimonio.canciones';
  readonly deleteConfirmImagePath = '/assets/img/FotosParaCards/PHOTO-2026-06-02-11-14-21 (1).jpg';
  private pendingDeleteId: string | null = null;

  musicTitle = '';
  musicArtist = '';
  musicSuggestions: MusicSuggestion[] = [];
  musicFormError = '';
  showDeleteConfirm = false;

  ngOnInit(): void {
    this.loadMusicSuggestions();
  }

  addMusicSuggestion(): void {
    const sanitizedTitle = this.musicTitle.trim();
    const sanitizedArtist = this.musicArtist.trim();

    if (!sanitizedTitle || !sanitizedArtist) {
      this.musicFormError = 'Completa el nombre de la cancion y el autor.';
      return;
    }

    this.musicFormError = '';
    const stamp = new Date().toISOString();

    const suggestion: MusicSuggestion = {
      id: `${Date.now()}-${Math.abs(this.hashCode(`${sanitizedTitle}-${sanitizedArtist}-${stamp}`))}`,
      title: sanitizedTitle,
      artist: sanitizedArtist,
      createdAt: stamp
    };

    this.musicSuggestions = [suggestion, ...this.musicSuggestions];
    this.persistMusicSuggestions();
    this.resetMusicForm();
  }

  removeMusicSuggestion(id: string): void {
    this.pendingDeleteId = id;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.pendingDeleteId = null;
    this.showDeleteConfirm = false;
  }

  confirmDelete(): void {
    if (!this.pendingDeleteId) {
      this.cancelDelete();
      return;
    }

    this.musicSuggestions = this.musicSuggestions.filter(item => item.id !== this.pendingDeleteId);
    this.persistMusicSuggestions();
    this.cancelDelete();
  }

  private loadMusicSuggestions(): void {
    const rawData = localStorage.getItem(this.musicStorageKey);
    if (!rawData) {
      this.musicSuggestions = [];
      return;
    }

    try {
      const parsed = JSON.parse(rawData) as Array<Partial<MusicSuggestion>>;
      this.musicSuggestions = parsed
        .filter(item => typeof item.title === 'string' && item.title.trim().length > 0)
        .map(item => ({
          id: item.id ?? `${Date.now()}-${Math.abs(this.hashCode(item.title ?? ''))}`,
          title: (item.title ?? '').trim(),
          artist: (item.artist ?? '').trim(),
          createdAt: item.createdAt ?? new Date().toISOString()
        }));
    } catch {
      this.musicSuggestions = [];
    }
  }

  private persistMusicSuggestions(): void {
    localStorage.setItem(this.musicStorageKey, JSON.stringify(this.musicSuggestions));
  }

  private resetMusicForm(): void {
    this.musicTitle = '';
    this.musicArtist = '';
  }

  private hashCode(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }
}
